//recebe diretamente a requisição e chama o serviço
 import {Request, Response} from 'express'
 //marndar para o services
 import {CreateUserService} from '../../services/user/CreateUserService'


 class CreateUserController{
    async handle(req: Request, res: Response){
        const{name, email,password} = req.body;
        //intanciar o método
        const createUserService = new CreateUserService();
        
        //acessar o método e pegar o retorno dele colocando em uma variável
        const user = await createUserService.execute({
            name,
            email,
            password
        
        }); 
        //await espera com que o método execute para depois passar pra linha de baixo 
        return res.json( user )
    }
 }

 export {CreateUserController}