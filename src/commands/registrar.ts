import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import modal from "./models/modalPerfil.ts";
import modalEdit from "./models/modalPerfilEdit.ts";
import { Database } from "../database/index.ts";
import perfil from "./execute/perfil.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("registro")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("novo")
        .setDescription("registre seu perfil!")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("editar")
        .setDescription("edite seu registro de perfil!")
    )
    .setDescription("registre-se para começar sua jornada!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const database = new Database();
    const sub = interaction.options.getSubcommand();
    if (sub === "novo") {
      const userExists = await database.exists(interaction.user.id);
      if (userExists) {
        await perfil(interaction);
        return;
      }
      await interaction.showModal(modal);
    } else if (sub === "editar") {
      const userExists = await database.exists(interaction.user.id);
      if (!userExists) {
        await interaction.showModal(modal);
        return;
      } else {
        const modal = modalEdit(userExists.info, String(userExists.age), userExists.sex, userExists.gender);
        await interaction.showModal(modal);
      }
    }
  },
};

