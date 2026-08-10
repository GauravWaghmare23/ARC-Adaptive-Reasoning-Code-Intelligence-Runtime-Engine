import {google} from "@ai-sdk/google";
import {streamText} from "ai";
import { config } from "../../config/google.config.js";
import chalk from "chalk";


export class AIService{
    constructor(){
        if (!config.googleApiKey) {
            throw new Error(chalk.red("Google API key is not defined"));
        };

        this.model = google(config.model,{
            apikey:config.googleApiKey,
        });

    }

    /**
     * send a message and get streaming response
     * @param {Array} messages
     * @param {function} chunks
     * @param {object} tools
     * @param {function} onToolCall
     * @return {Promises<Object>}
     */

    async sendMessage(messages, chunks, tools = undefined, onToolCall = null){
        try {
            const streamConfig = {
                model:this.model,
                messages:messages
            }

            const result = streamText(streamConfig);

            let fullResponse = "";

            for await(const chunk of result.textStream){
                fullResponse += chunk;
                if(chunks){
                    chunks(chunk)
                }
            }

            const fullResult = await result.text;
            
            return{
                content:fullResponse,
                finishResponse:fullResult.finishReason,
                usage:fullResult.usage
            }
            
        } catch (error) {
            console.log(chalk.red("Ai service error: "), error);
            throw error;
            
        }
    }

    /**
     * Get a non-streaming response
     * @param {Array} messages
     * @param {Object} tools
     * @return {Promise<string>}
     */

    async getMessage(messages, tools = undefined){
        let fullResponse = "";
        await this.sendMessage(messages,(chunk)=>{
            fullResponse += chunk
        })
        return fullResponse;
    }
    
}