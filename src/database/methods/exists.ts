import { User } from "../schemas/User.ts";

export default async function(discordId: Number){
    const exists = await User.findOne({ discordId });
    return exists ? exists : false;
}