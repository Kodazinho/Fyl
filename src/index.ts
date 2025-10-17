import { Client, Collection, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import "colors";
import { loadCommands } from "./handlers/loadCommands.ts";
import { interactionCreate } from "./handlers/interactionCreate.ts";
import { Database } from "./database/index.ts";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();

client.once("clientReady", async () => {
  console.clear();
  console.log(`[ ${"*".green} ] Logado como: ${client.user?.tag?.bgWhite.black}!`);
  await Database.connect();

  await loadCommands(client);
});

client.on("interactionCreate", async (interaction) => {
  await interactionCreate(client, interaction);
});

client.login(process.env.TOKEN);