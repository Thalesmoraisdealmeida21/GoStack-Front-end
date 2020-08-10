
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError'
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: IUserTokensRepository;
let resetPassowrd: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {

  beforeEach(()=> {
     fakeUsersRepository = new FakeUsersRepository();
     fakeUserTokensRepository = new FakeUserTokensRepository();
     fakeHashProvider = new FakeHashProvider();



     resetPassowrd = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );

  })
  it('should be able to reset the password', async  () => {

        let user = await fakeUsersRepository.create({
          name: 'Jhon Doe',
          email: 'jhon@jhon.com',
          password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);


        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
        await resetPassowrd.execute({
          password: '123123',
          token
        })

        const updatedUser = await fakeUsersRepository.findById(user.id);




        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
  });



        it('should not be able to reset the passwor whith non-existing token', async ()=> {
            await expect(
              resetPassowrd.execute({
                token: 'non-existing-token',
                password: '123456'
              })
            ).rejects.toBeInstanceOf(AppError);
        })


        it('should not be able to reset the passwor whith non-existing user', async ()=> {

          const {token} = await fakeUserTokensRepository.generate('non-existing-user')
          await expect(
            resetPassowrd.execute({
              token,
              password: '123456'
            })
          ).rejects.toBeInstanceOf(AppError);
      })


      it('should not be able to reset the password if passed more then two hours', async () => {

        let user = await fakeUsersRepository.create({
          name: 'Jhon Doe',
          email: 'jhon@jhon.com',
          password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
           resetPassowrd.execute({
            password: '123123',
            token
          })
        ).rejects.toBeInstanceOf(AppError);




      })



});
