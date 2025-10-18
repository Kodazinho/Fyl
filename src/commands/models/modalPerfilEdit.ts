import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";
export default function(about: string, age: string, sex: string, gender: string){
const modal = new ModalBuilder()
  .setCustomId("profile_modal_edit")
  .setTitle("Edite Seu Perfil");

const aboutInput = new TextInputBuilder()
  .setCustomId("about")
  .setLabel("Sobre você (max 200 caracteres)")
  .setStyle(TextInputStyle.Paragraph)
  .setMaxLength(200)
  .setValue(about)
  .setRequired(true);

const ageInput = new TextInputBuilder()
  .setCustomId("age")
  .setLabel("Idade")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Digite apenas números")
  .setValue(age)
  .setRequired(true);

const sexInput = new TextInputBuilder()
  .setCustomId("sex")
  .setLabel("Sexo (Homem ou Mulher)")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Homem / Mulher")
  .setValue(sex)
  .setRequired(true);

const genderInput = new TextInputBuilder()
  .setCustomId("gender")
  .setLabel("Gênero com o qual se identifica")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Digite seu gênero")
  .setMaxLength(30)
  .setValue(gender)
  .setRequired(true);

const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(aboutInput);
const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ageInput);
const thirdRow = new ActionRowBuilder<TextInputBuilder>().addComponents(sexInput);
const fourthRow = new ActionRowBuilder<TextInputBuilder>().addComponents(genderInput);

modal.addComponents(firstRow, secondRow, thirdRow, fourthRow);
return modal;
}
