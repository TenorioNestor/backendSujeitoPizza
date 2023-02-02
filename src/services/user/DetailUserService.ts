import prismaClient from "../../prisma"; 

class DetailUserService{
    async execute(user_id: string){
        //procura no banco o primeiro id que seja igual ao que esta sendo fornecido
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id:true,
                name: true,
                email:true,
            }
        })


        return user;
    }
}

export { DetailUserService}