import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

const configuration = new Configuration({
  apiKey: env.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(data: Record<string, unknown>, socialMedia: string) {
  let prompt = "";

  if (socialMedia === "Twitter") {
    prompt +=
      "Create a Twitter thread or post for me that summarizes the following data: ";
  } else {
    prompt +=
      "Create a LinkedIn post for me that summarizes the following data: ";
  }
  prompt += `${JSON.stringify(data)}.
    Make sure it highlights the positive outcomes.
    The team wants to celebrate the current success of their app and is getting the data from Appfigures.
    Appfigures is a tool that helps developers track their app's performance.
  `;

  return prompt;
}

export const openaiRouter = createTRPCRouter({
  getResponse: publicProcedure
    .input(z.object({ data: z.object({}), socialMedia: z.string() }))
    .query(async ({ input }) => {
      if (!configuration.apiKey) {
        return {
          error: "Invalid API key",
        };
      }

      try {
        const { data, socialMedia } = input;
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(data, socialMedia),
          temperature: 0.5,
          max_tokens: 200,
        });
        return { results: completion.data };
      } catch (error) {
        console.log(error, error);
      }
    }),
});
