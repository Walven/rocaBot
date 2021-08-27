import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type Command = {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
  execute(interaction: CommandInteraction): void
}

export default Command;