import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

const modal = new ModalBuilder()
  .setCustomId("profile_modal")
  .setTitle("Seu Perfil");

const aboutInput = new TextInputBuilder()
  .setCustomId("about")
  .setLabel("Sobre você (max 200 caracteres)")
  .setStyle(TextInputStyle.Paragraph)
  .setMaxLength(200)
  .setRequired(true);

const ageInput = new TextInputBuilder()
  .setCustomId("age")
  .setLabel("Idade")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Digite apenas números")
  .setRequired(true);

const sexInput = new TextInputBuilder()
  .setCustomId("sex")
  .setLabel("Sexo (Homem ou Mulher)")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Homem / Mulher")
  .setRequired(true);

const genderInput = new TextInputBuilder()
  .setCustomId("gender")
  .setLabel("Gênero com o qual se identifica")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Digite seu gênero")
  .setMaxLength(30)
  .setRequired(true);

const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(aboutInput);
const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ageInput);
const thirdRow = new ActionRowBuilder<TextInputBuilder>().addComponents(sexInput);
const fourthRow = new ActionRowBuilder<TextInputBuilder>().addComponents(genderInput);

modal.addComponents(firstRow, secondRow, thirdRow, fourthRow);

export default modal;