import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { getStoredToken } from "../../../config/token.js";
import { prisma } from "../../../config/database.js";
import { select } from "@clack/prompts";
import { startChat } from "../../chat/chat-with-ai.js";


const wakeupAction = async () => {
    const token = await getStoredToken();

    if (!token?.access_token) {
        console.log(chalk.red("No Authenticated, Please login."));
        return;
    }

    const spinner = ora({
        text: chalk.yellow("Fetching User Info..."),
        spinner: "line",
    }).start();

    const user = await prisma.user.findFirst({
        where: {
            sessions: {
                some: {
                    token: token.access_token
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        }
    });

    if (!user) {
        spinner.stop();
        console.log(chalk.red("No user found, Please login first."));
        return;
    }

    spinner.stop();

    console.log(chalk.green(`Welcome back, ${user.name}!\n`));

    const choice = await select({
        message: "Select an Option:",
        options: [
            {
                value: "chat",
                label: "Chat",
                hint: "Simple chat with AI",
            },
            {
                value: "tool",
                label: "Tool Calling",
                hint: "Chat with tools (Google Search, Code Execution)",
            },
            {
                value: "agent",
                label: "Agentic Mode",
                hint: "Advanced AI agent (Coming soon)",
            },
        ],
    });

    switch (choice) {
        case "chat":
            startChat();
            break;

        case "tool":
            console.log(chalk.green("Tool calling is selected"));
            break;

        case "agent":
            console.log(chalk.yellow("Agentic mode coming soon"));
            break;
    }
}


export const wakeup = new Command("wakeup")
    .description("Wakeup ARC AI and start conversation.")
    .action(wakeupAction);
    
