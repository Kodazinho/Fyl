import mongoose from "mongoose";
import "dotenv/config";
import colors from "colors";

import register from "./methods/register.ts";
import registerEdit from "./methods/registerEditar.ts";
import exists from "./methods/exists.ts";

export class Database {
  private static _uri: string = process.env.MONGO || "";

  public register : Function = register;
  public exists : Function = exists;
  public registerEdit : Function = registerEdit;

  static async connect(): Promise<boolean> {
    if (!this._uri) {
      console.log(`[ ${"*".red} ] Sem database definido para conexão.`);
      return false;
    }

    try {
      await mongoose.connect(this._uri);
      console.log(`[ ${"*".green} ] Conectado ao ${"Monguinho".green}.`);
      return true;
    } catch (error) {
      console.log(`[ ${"*".red} ] Erro na conexão:`, error);
      return false;
    }
  }
}
