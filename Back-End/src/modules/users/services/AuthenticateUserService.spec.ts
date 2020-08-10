
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'


describe('AuthenticateUser', () => {
  it('should be able to authenticate', async  () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
          name: "Jhon Doe",
          email: "jhon@jhon.com",
          password: '123456'
        })

        const response = await authenticateUser.execute({
          email: "jhon@jhon.com",
          password: '123456'
        })



        expect(response).toHaveProperty('token');

  })
});
