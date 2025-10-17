import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import execute from "./execute/perfil.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Exibe seu perfil!")
    .addUserOption(option =>
      option
        .setName("usuario")
        .setDescription("Escolha outro usuário (opcional)")
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await execute(interaction);
  },
};
