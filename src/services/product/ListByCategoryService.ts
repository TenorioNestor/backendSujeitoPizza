import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id }: ProductRequest){
        //lista produtos
        const findByCategory = await prismaClient.product.findMany({//procure no banco toddos que tenham esse parametro
            where:{
               category_id: category_id 
            }
        })

        return findByCategory;
    }
}

export {ListByCategoryService}