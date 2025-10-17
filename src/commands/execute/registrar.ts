import { ModalSubmitInteraction } from "discord.js";
import { Database } from "../../database/index.ts";


const database = new Database();

export default async function (interaction: ModalSubmitInteraction) {

    const about = interaction.fields.getTextInputValue("about");
    const age = interaction.fields.getTextInputValue("age");
    const sex = interaction.fields.getTextInputValue("sex");
    const gender = interaction.fields.getTextInputValue("gender");

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber)) {
        return await interaction.reply({
            content: "Idade inválida!",
            ephemeral: true,
        });
    }

    if(sex.toLocaleLowerCase() != "homem" && sex.toLocaleLowerCase() != "mulher"){
        return await interaction.reply({
            content: "Sexo inválido! Use 'Homem' ou 'Mulher'.",
            ephemeral: true,
        });
    }

    let result : RegisterResult = await database.register(interaction.user.id, about, age, sex.toLocaleLowerCase(), gender);
    return await interaction.reply({
        content: result.message || "Erro desconhecido.",
        ephemeral: true,
    });
}

type RegisterResult = {
    success: boolean;
    message?: string;
};