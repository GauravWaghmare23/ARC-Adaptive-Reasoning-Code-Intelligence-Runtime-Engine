#!/usr/bin/env node

import "dotenv/config";

import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";
import { wakeup } from "./commands/ai/wakeup.js";

async function main() {
  // --------------------------------------------------
  // Check which command was provided
  // --------------------------------------------------

  const command = process.argv[2];

  // Show banner only when no command is provided
  const showBanner = !command;

  // --------------------------------------------------
  // Colors
  // --------------------------------------------------

  const green = chalk.hex("#39FF14");
  const lime = chalk.hex("#B6FF00");
  const yellow = chalk.hex("#FFE600");
  const orange = chalk.hex("#FF9F00");
  const white = chalk.hex("#FFFFFF");
  const gray = chalk.hex("#D4D4D4");

  // --------------------------------------------------
  // Display ARC banner
  // --------------------------------------------------

  if (showBanner) {
    console.log(
      green(
        figlet.textSync("ARC Mark I", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );

    // Product description
    console.log(
      `  ${green("AI-Powered")} ${lime("Developer")} ${yellow(
        "Assistant"
      )}`
    );

    console.log(
      `  ${white("Understand code.")} ${orange(
        "Debug faster."
      )} ${yellow("Build smarter.")}`
    );

    console.log(
      `  ${gray("Your intelligent command-line companion.")}`
    );

    console.log();
  }

  // --------------------------------------------------
  // Commander
  // --------------------------------------------------

  const program = new Command();

  program
    .name("arc")
    .version("0.1.0")
    .description("AI-powered developer assistant")
    .addCommand(login)
    .addCommand(logout)
    .addCommand(whoami)
    .addCommand(wakeup)

  program.parse();
}


main().catch((error) => {
    console.error("Error running arc cli:", error)
    process.exit(1)
});