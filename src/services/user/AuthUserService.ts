import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'; //Compara se a senha enviada é a mesma que esta no banco 
import { sign } from 'jsonwebtoken' //gerar o token

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email,password}: AuthRequest){
        //Verificar se o email existe na dataBase
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if (!user){
            throw new Error("User/password incorrect")
        }
        //comparar se a senha é a mesma que esta no banco 
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch){
            throw new Error("User/password incorrect")
        }

        //gerar um token JWT e devolver os dados do usuário com id, nome e email
        //é preciso instalar o jsonwebtoken
        //Gerar token para o usuário - para acessar as variaveis de objeto instalar o dotenv
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }

        )

        
        return{
            id: user.id,
            name:user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService};