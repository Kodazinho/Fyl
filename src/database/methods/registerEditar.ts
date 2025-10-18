import { User } from "../schemas/User.ts";

export default async function(discordId: string, info: string, age: number, sex: string, gender: string){
    const user = await User.findOne({ discordId });
    if(!user){
        return { success: false, message: "Usuário ainda não registrado!" };
    }
    let sexString : string = "";
    (sex == "homem") ? sexString = "homem" : "mulher"; 
    user.info = info;
    user.age = age;
    user.sex = sex;
    user.gender = gender;
    await user.save();
    return { success: true, message: "Usuário editado com sucesso!" };
}