import crypto from 'crypto';// vai fazer nomes para que as imagens não tenham nomes repetidos
import multer from 'multer';

import {extname,resolve} from 'path'

export default{
    upload(folder: string ){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname,'..','..',folder),//destino das imagens
                filename:(request, file, callback)=>{//não deixa os nomes se reptirem
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null,fileName)
                }
            })
        }
    }
}