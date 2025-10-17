import { EmbedBuilder, Client } from "discord.js";

interface UserData {
  discordId: string;
  info: string;
  age: number;
  sex: string;
  gender: string;
  registeredAt: Date;
}

export async function createUserProfileEmbed(userData: UserData, client: Client): Promise<EmbedBuilder | null> {
  const targetUser = await client.users.fetch(userData.discordId).catch(() => null);
  if (!targetUser) return null; 

  const avatarUrl = targetUser.displayAvatarURL({ extension: "png", size: 256 });
  const bannerUrl = targetUser.bannerURL({ extension: "gif", size: 1024 }) || null;

  const embed = new EmbedBuilder()
    .setTitle(`Perfil de ${targetUser.username}`)
    .setDescription(`Clique [aqui](https://discord.com/users/${userData.discordId}) para enviar um pedido de amizade.`)
    .addFields(
      { name: 'Idade', value: `${userData.age} anos`, inline: true },
      { name: 'Sexo', value: userData.sex, inline: true },
      { name: 'Gênero', value: userData.gender, inline: true },
      { name: 'Sobre mim', value: userData.info, inline: false },
      { name: 'Cadastrado desde', value: new Date(userData.registeredAt).toLocaleDateString(), inline: false }
    )
    .setThumbnail(avatarUrl)
    .setTimestamp();

  if (bannerUrl) embed.setImage(bannerUrl);

  return embed;
}
