


import User from "../../infra/typeorm/entities/User"
import {uuid} from 'uuidv4'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';



class UsersRepository implements IUsersRepository{

   private users: User[] = [];

    public async findById(id: string): Promise<User | undefined>{

      const userFound = this.users.find(user => user.id === id);

      return userFound;
    }

    public async findByEmail(email: string): Promise<User | undefined>{

      const userFound = this.users.find(user => user.email === email);

      return userFound;


    }



   public async create(UserData: ICreateUserDTO): Promise<User>{
    const user = new User();

    Object.assign(user, {id: uuid(), UserData});

    this.users.push(user);
    return user;
   }


   public async save(UserData: User): Promise<User>{
      const findIndex = this.users.findIndex(user => user.id === UserData.id);

      this.users[findIndex] = UserData;


      return UserData;


  }


}

export default UsersRepository;
