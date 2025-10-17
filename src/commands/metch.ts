import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { User as UserModel } from "../database/schemas/User.ts";
import {createUserProfileEmbed} from "./models/embedMetch.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("metch")
    .setDescription("Mostra o perfil de um usuário aleatório!"),

  async execute(interaction: ChatInputCommandInteraction) {
    const { client } = interaction;
    const users = await UserModel.find({ discordId: { $ne: interaction.user.id } });
    if (!users.length) {
      return interaction.reply({ content: "Não há usuários disponíveis no momento.", ephemeral: true });
    }

    const randomUser = users[Math.floor(Math.random() * users.length)];

    const embed = await createUserProfileEmbed(randomUser, client);
    if (!embed) {
      return interaction.reply({ content: "Não foi possível pegar o perfil do usuário no Discord.", ephemeral: true });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
