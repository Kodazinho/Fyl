import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import modal from "./models/modalPerfil.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("registro")
    .setDescription("registre-se para começar sua jornada!"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.showModal(modal);
  },
};
