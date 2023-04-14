import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(data: Record<string, unknown>, socialMedia: string) {
  return `Create a ${socialMedia} post for me that summarizes the following data: ${JSON.stringify(
    data
  )}.
    Make sure it highlights the positive outcomes.
    The team wants to celebrate the current success of their app and is getting the data from Appfigures.
    Appfigures is a tool that helps developers track their app's performance.`;
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
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          return {
            error: {
              message: error.response.data,
            },
          };
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          return {
            error: {
              message: "An error occurred during your request.",
            },
          };
        }
      }
    }),
});
