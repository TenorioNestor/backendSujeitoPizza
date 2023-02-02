import express,{Request,Response,NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path';//caminhos
//sempre deixar essa lib em segundo
import {router} from './routes'

const app = express();
//informar o tipo de dado que vai ser usado
app.use(express.json()); 

app.use(cors());

//rotas da aplicação
app.use(router);

//acessar a pasta tmp
app.use(
    '/files',
    express.static(path.resolve(__dirname,'..', 'tmp'))
)

//criar uma barreira um middleware 
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    //verificar o erro
    if(err instanceof Error){
        //se for uma instacia do tipo erro
        res.status(400).json({
            error: err.message
        })
    }
    //Se for um internal server error
    return res.status(500).json({
        status:'Error',
        message:'Internal server error'
    })
})

//inicializar o projeto
app.listen(3333, () => console.log('Servidor Oline!!!')) 