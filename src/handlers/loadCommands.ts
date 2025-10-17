import { Client, Collection, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import "colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client: Client & { commands: Collection<string, any> }) {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
  console.log(`[ ${"*".green} ] Tentando carregar ${commandFiles.length} comandos...`);

  const commands = [];
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      const commandModule = await import(pathToFileURL(filePath).href);
      const command = commandModule.default;

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      }
    } catch (error) {
      console.error(`[ ${"*".red} ] Erro ao carregar o comando "${file}":`, error);
    }
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log(`[ ${"*".green} ] ${commands.length} comandos globais registrados com sucesso!`);
  } catch (error) {
    console.error(`[ ${"*".red} ] Erro ao registrar comandos globais:`, error);
  }
}