import { ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import modal from "../models/modalPerfil.ts";
import { Database } from "../../database/index.ts";
import { generateProfileBanner } from "../../canva/index.ts";
import { stringify } from "querystring";

const database = new Database();

export default async function (interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser("usuario") || interaction.user;

    const registred = await database.exists(targetUser.id);

    if (targetUser.id === interaction.user.id) {
        if (registred) {
            const avatarUrl = targetUser.displayAvatarURL({ extension: "png", size: 256 });
            const bannerUrl = targetUser.bannerURL({ extension: "gif", size: 1024 }) || undefined;

            const buffer = await generateProfileBanner({
                name: targetUser.username,
                age: registred.age,
                avatarUrl: avatarUrl,
                bannerUrl: bannerUrl,
                about: registred.info,
            });
            const attachment = new AttachmentBuilder(buffer, { name: "perfil.png" });
            await interaction.reply({
                files: [attachment]
            });
        } else {
            await interaction.showModal(modal);
        }
    } else {
        if (!registred) {
            await interaction.reply({
                content: `[ 📍 ] ${targetUser.username} não tem um perfil criado.`,
                ephemeral: true,
            });
        } else {
            const avatarUrl = targetUser.displayAvatarURL({ extension: "png", size: 256 });
            const bannerUrl = targetUser.bannerURL({ extension: "gif", size: 1024 }) || undefined;

            const buffer = await generateProfileBanner({
                name: targetUser.username,
                age: registred.age,
                avatarUrl: avatarUrl,
                bannerUrl: bannerUrl,
                about: registred.info,
            });
            const attachment = new AttachmentBuilder(buffer, { name: "perfil.png" });
            await interaction.reply({
                files: [attachment]
            });
        }
    }
}