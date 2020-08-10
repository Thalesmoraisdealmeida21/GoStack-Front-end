
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError'


describe('UpdateUserAvatar', () => {
  it('', async  () => {
          const fakeUsersRepository  = new FakeUsersRepository();
          const fakeStorageProvider = new FakeStorageProvider();


          const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
          )

          const user = await fakeUsersRepository.create({
              name: 'Jhon',
              email: 'jhon@email.com',
              password: '123456'
          })

          await updateUserAvatar.execute({
              user_id: user.id,
              avatarFilename: 'avatar.jpg'
          });

          expect(user.avatar).toBe('avatar.jpg')



  })
});
