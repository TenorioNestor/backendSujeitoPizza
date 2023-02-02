import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name , email , password}: UserRequest){
        
        //verificar se enviou o e-mail
        if (!email){
            throw new Error("Email incorrect")
        }
        
        //Verificar se o email já esta cadastrado na plataforma
        //Buscar o primeiro item que ele encontrar findFirst
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email 
            }
        }) 
        // se o userAlreadyExists encontrar alto entra nesse if
        if (userAlreadyExists){
            throw new Error("User already exists")
        }

        //iosso criptografa a senha
        const passwordHash = await hash(password,8)

        //Realmente criar um user no dataBase
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id:true,
                email:true,
                name:true,
            }
            //é necessário criptografar a senha
            //usando uma lib chamada bcryptjs
            //

        })


        return user;
    }
}

export { CreateUserService }