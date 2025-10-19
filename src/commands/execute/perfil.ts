import { ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import modal from "../models/modalPerfil.ts";
import { Database } from "../../database/index.ts";
import generateProfileBanner from "../../banners/bannerPerfil.ts";

const database = new Database();

const capitalizeFirst = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatDate = (dateStr: string): string => {
    if (!dateStr) return "Desconhecida";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "Desconhecida";
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    } catch {
        return "Desconhecida";
    }
};

export default async function (interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser("usuario") || interaction.user;

    await interaction.deferReply({ ephemeral: true });

    const registred = await database.exists(targetUser.id);

    if (targetUser.id === interaction.user.id) {
        if (registred) {
            const avatarUrl = targetUser.displayAvatarURL({ extension: "png", size: 512 });
            const bannerUrl: string = targetUser.bannerURL({ extension: "png", size: 512 }) || "https://i.pinimg.com/736x/2d/e5/82/2de58268bd857a3c1933215b2c139209.jpg";

            try {
                const buffer = await generateProfileBanner({
                    nome: targetUser.username,
                    idade: registred.age || 0,
                    avatar: avatarUrl,
                    bio: registred.info || "Sem bio disponível",
                    banner: bannerUrl,
                    genero: capitalizeFirst(registred.gender || "Não especificado"),
                    sex: capitalizeFirst(registred.sex || "Não especificado"),
                    entrada: formatDate(registred.registeredAt || "Desconhecida"),
                });

                if (!Buffer.isBuffer(buffer)) {
                    throw new Error("Buffer inválido retornado por generateProfileBanner");
                }

                const attachment = new AttachmentBuilder(buffer, { name: "perfil.png" });

                await interaction.editReply({
                    files: [attachment],
                    ephemeral: true,
                });
            } catch (error) {
                console.error("Erro ao gerar banner:", error);
                await interaction.editReply({
                    content: "Ocorreu um erro ao gerar o perfil. Tente novamente mais tarde.",
                    ephemeral: true,
                });
            }
        } else {
            await interaction.showModal(modal);
        }
    } else {
        if (!registred) {
            await interaction.editReply({
                content: `[ 📍 ] ${targetUser.username} não tem um perfil criado.`,
                ephemeral: true,
            });
        } else {
            const avatarUrl = targetUser.displayAvatarURL({ extension: "png", size: 512 });
            const bannerUrl: string = targetUser.bannerURL({ extension: "png", size: 512 }) || "https://via.placeholder.com/900x450/1a1a1a/FFFFFF?text=No+Banner";

            try {
                const buffer = await generateProfileBanner({
                    nome: targetUser.username,
                    idade: registred.age || 0,
                    avatar: avatarUrl,
                    bio: registred.info || "Sem bio disponível",
                    banner: bannerUrl,
                    genero: capitalizeFirst(registred.gender || "Não especificado"),
                    sex: capitalizeFirst(registred.sex || "Não especificado"),
                    entrada: formatDate(registred.registeredAt || "Desconhecida"),
                });

                if (!Buffer.isBuffer(buffer)) {
                    throw new Error("Buffer inválido retornado por generateProfileBanner");
                }

                const attachment = new AttachmentBuilder(buffer, { name: "perfil.png" });

                await interaction.editReply({
                    files: [attachment],
                    ephemeral: true,
                });
            } catch (error) {
                console.error("Erro ao gerar banner:", error);
                await interaction.editReply({
                    content: `[ 📍 ] Erro ao gerar o perfil de ${targetUser.username}.`,
                    ephemeral: true,
                });
            }
        }
    }
}