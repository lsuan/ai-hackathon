import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAPI_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(data: Record<string, unknown>) {
  const stringified = JSON.stringify(data, null, 2);
  return `Create a LinkedIn post for me that summarizes the following data: ${stringified}.
  Make sure it highlights the positive outcomes. `;
}

export const openaiRouter = createTRPCRouter({
  getResponse: publicProcedure.input(z.object({})).query(async ({ input }) => {
    if (!configuration.apiKey) {
      return {
        error: "Invalid API key",
      };
    }

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(input),
        temperature: 0.6,
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
