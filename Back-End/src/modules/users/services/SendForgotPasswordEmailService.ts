



import {inject, injectable} from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import IUsersRepository from '../repositories/IUsersRepository'
interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      @inject('UserTokensRepository')
      private userTokensRepository: IUserTokensRepository

    ){}

    public async execute({ email }: IRequest): Promise<void>{
      const user = await this.usersRepository.findByEmail(email);


      if(!user){
        throw new AppError('User does not exists.');
      }

      await this.userTokensRepository.generate(user.id)


      this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }
}

export default SendForgotPasswordEmailService
