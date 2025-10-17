import { User } from "../schemas/User.ts";

export default async function(discordId: string, info: string, age: number, sex: string, gender: string){
    const existingUser = await User.findOne({ discordId });
    if(existingUser){
        return { success: false, message: "Usuário já registrado." };
    }
    let sexString : string = "";
    (sex == "homem") ? sexString = "homem" : "mulher"; 
    const newUser = new User({
        discordId, 
        info,
        age,
        sex: sexString,
        gender
    });
    await newUser.save();
    return { success: true, message: "Usuário registrado com sucesso!" };
}