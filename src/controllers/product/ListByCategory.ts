import {Request, Response} from 'express'
import {ListByCategoryService} from '../../services/product/ListByCategoryService'

class ListByCategory{
    async handle(req:Request,res:Response){
        //acesso via query
        const category_id = req.query.category_id as string;

        const listByCategory = new ListByCategoryService();

        const products = await listByCategory.execute({
            category_id
        });

        return res.json(products)
    }
}

export {ListByCategory};