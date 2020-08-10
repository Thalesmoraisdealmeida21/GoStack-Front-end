



import {inject, injectable} from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User'

import IHashProvider from './../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository'
interface Request {
    name: string,
    email: string,
    password: string
}

@injectable()
class CreateUserService {

    constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
      ){}

    public async execute({name, email, password}: Request): Promise<User | undefined>{


        const checkUserExist = await this.usersRepository.findByEmail(email);

        if(checkUserExist){
            throw new Error('Email address already used. ');
        }


        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user
    }
}

export default CreateUserService
