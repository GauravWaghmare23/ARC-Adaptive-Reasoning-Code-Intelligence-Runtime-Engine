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

  const accent = chalk.hex("#22C55E");
  const white = chalk.white;
  const secondary = chalk.gray;
  const muted = chalk.dim.gray;

  // --------------------------------------------------
  // Display ARC banner
  // --------------------------------------------------

  if (showBanner) {
    console.log();

    console.log(
      accent(
        figlet.textSync("ARC Mark I", {
          font: "Standard",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );

    console.log(
      `  ${white("AI-powered developer assistant")}  ${muted("· v0.1.0")}`
    );

    console.log(
      `  ${secondary(
        "Understand code, debug faster, and build smarter — right from your terminal."
      )}`
    );

    console.log();
    console.log(muted(`  ${"─".repeat(54)}`));
    console.log();

    console.log(`  ${secondary("Get started")}     ${white("arc login")}`);
    console.log(`  ${secondary("Start chatting")}  ${white("arc wakeup")}`);
    console.log(`  ${secondary("All commands")}    ${white("arc --help")}`);

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
    console.log();
    console.log(chalk.red("  ✕ Error running arc cli"));
    console.log(chalk.dim(`    ${error?.message || error}`));
    console.log();
    process.exit(1)
});