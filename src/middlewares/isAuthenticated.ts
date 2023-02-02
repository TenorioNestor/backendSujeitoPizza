import {NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken' //verifica o token 

interface PayLoad{
    sub: string; //id do usuário presente no token
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    
    //Receber o token
    const authToken = req.headers.authorization;

    if (!authToken){
        return res.status(401).end();
    }

    //é preciso separa o prefixo do token
    const [, token] = authToken.split(" ")

    ///Verificação
    try{
        ///validar o token
        const { sub  } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;//esta afirmando que vai devolver o payload
        ///recuperar o id do token e colocar dentro de uma variavel dentro do req
        req.user_id = sub;

        return next();
    }catch(err){
        return res.status(401).end();
    }
}