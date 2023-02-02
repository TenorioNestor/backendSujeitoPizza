import prismaClient from "../../prisma";

interface OrderRequest{
    order_id:string
}

class SendOrderService{
    async execute({order_id}:OrderRequest){
//ipdate é para atualizar alguma informação na tabela 
        const order= await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                draft:false
            }
            
        })
        return order;
    }
}

export {SendOrderService}