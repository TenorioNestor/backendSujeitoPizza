import prismaClient from '../../prisma'

class ListCategoryService{
    async execute(){
        //findMany tras todos os resultados da tabela do banco
        //o selecty filtra apenas as informações que seram solicitadas
        const category = await prismaClient.category.findMany({
            select:{
                id:true,
                name: true,
            }
        });
        return category;
    }
}

export {ListCategoryService}