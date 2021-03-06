import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express'


import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import cors from 'cors'

import '@shared/infra/typeorm';

import routes from './routes'


import '@shared/container/index';


const app = express()

import '@shared/container';

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes)


app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message:err.message
        })
    }

    console.error("Erro" + err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

app.listen(3333, ()=>{
    console.log('Server started on port 3333')
})
