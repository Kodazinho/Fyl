import { Client } from "discord.js";

import registrar from "../commands/execute/registrar.ts";
import registrarEditar from "../commands/execute/editar.ts";

export async function interactionCreate(client: Client, interaction: any) {

    if(interaction.isModalSubmit()){
        if (interaction.customId === "profile_modal") {
            await registrar(interaction);
        }else if (interaction.customId === "profile_modal_edit") {
            await registrarEditar(interaction);
        }
    }

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.warn(`[ ${"*".yellow} ] Comando "${interaction.commandName}" não encontrado.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(`[ ${"*".red} ] Erro ao executar o comando "${interaction.commandName}":`, err);
        await interaction.reply({
        content: "❌ Ocorreu um erro ao executar este comando.",
        ephemeral: true,
        });
    }

}