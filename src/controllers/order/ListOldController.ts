import { Request, Response } from "express";
import {ListOldService} from './../../services/order/ListOldService'


class ListOldController{
    async handle(req:Request, res:Response){
        const listOld = new ListOldService();

        const orders = await listOld.execute();

        return res.json(orders)
    }
}

export {ListOldController}