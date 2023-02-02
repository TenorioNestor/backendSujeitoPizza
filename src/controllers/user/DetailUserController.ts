import {Request, Response} from 'express' 
import { DetailUserService} from '../../services/user/DetailUserService'

class DetailUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const datailUserService = new DetailUserService();

        //passa o id do usuário para o metodo
        const user = await datailUserService.execute(user_id);

        return res.json(user);
    }
}

export { DetailUserController}