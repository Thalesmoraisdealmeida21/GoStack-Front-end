
import {getRepository, Repository} from 'typeorm'

import User from "../entities/User"

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';



class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>;


  constructor(){
        this.ormRepository = getRepository(User);
  }






    public async findById(id: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
          where: { email },
        })

        return user;
    }


    public async save(user: User): Promise<User>{
        return this.ormRepository.save(user);
    }

   public async create(UserData: ICreateUserDTO): Promise<User>{
      const appointment =  this.ormRepository.create(UserData)

      this.ormRepository.save(appointment);

      return appointment;
   }

}

export default UsersRepository;
