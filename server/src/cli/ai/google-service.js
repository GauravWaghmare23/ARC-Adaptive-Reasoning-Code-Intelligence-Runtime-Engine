import { google } from "@ai-sdk/google";
import { streamText, stepCountIs } from "ai";
import { config } from "../../config/google.config.js";
import chalk from "chalk";

export class AIService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error(
        chalk.red("Google API key is not defined")
      );
    }

    this.model = google(config.model, {
      apiKey: config.googleApiKey,
    });
  }

  async sendMessage(
    messages,
    chunks,
    tools = undefined,
    onToolCall = null
  ) {
    try {
      const streamConfig = {
        model: this.model,
        messages: messages,
        maxOutputTokens: config.maxOutputTokens
      };

      if (tools && Object.keys(tools).length > 0) {
        streamConfig.tools = tools;
        streamConfig.stopWhen = stepCountIs(1);

        console.log(
          chalk.dim(
            `  using tools: ${Object.keys(tools).join(", ")}`
          )
        );
      }

      const result = streamText(streamConfig);

      let fullResponse = "";

      for await (const chunk of result.textStream) {
        fullResponse += chunk;

        if (chunks) {
          chunks(chunk);
        }
      }

      const fullResult = result;

      const toolCalls = [];
      const toolResults = [];

      if (
        fullResult.steps &&
        Array.isArray(fullResult.steps)
      ) {
        for (const step of fullResult.steps) {

          if (
            step.toolCalls &&
            step.toolCalls.length > 0
          ) {
            for (const toolCall of step.toolCalls) {

              toolCalls.push(toolCall);

              if (onToolCall) {
                onToolCall(toolCall);
              }
            }
          }

          if (
            step.toolResults &&
            step.toolResults.length > 0
          ) {
            toolResults.push(
              ...step.toolResults
            );
          }
        }
      }

      const usage = await fullResult.usage;

      console.log(
        chalk.yellowBright(
          `\n    Usage : ${JSON.stringify(usage)}`
        )
      );

      return {
        content: fullResponse,
        finishResponse:
          await fullResult.finishReason,
        usage:
          await fullResult.usage,
        toolCalls,
        toolResults,
        steps: fullResult.steps,
      };

    } catch (error) {
      console.log();
      console.log(
        chalk.red("  ✕ AI service error"),
        chalk.dim(error?.message || error)
      );

      throw error;
    }
  }

  async getMessage(
    messages,
    tools = undefined
  ) {
    const result = await this.sendMessage(
      messages,
      null,
      tools
    );

    return result.content;
  }
}