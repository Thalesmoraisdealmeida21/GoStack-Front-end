
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async  () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createAppointment = new CreateAppointmentService(
          fakeAppointmentsRepository,
          fakeUsersRepository
        );

        const createUser = new CreateUserService(
          fakeUsersRepository,
          fakeHashProvider
        )

        const user = await createUser.execute({
          name: 'Jhon Doe',
          email: 'jhon@mail.com',
          password: '123456'
        })


        const appointment = await createAppointment.execute({
          date: new Date(),
          provider_id: user?.id  || '',
        })

        expect(appointment.provider_id).toBe(user?.id);
  });

  it('should be able to create a new appointment within non-existing provider_id', async  () => {
      const fakeAppointmentsRepository = new FakeAppointmentsRepository();
      const fakeUsersRepository = new FakeUsersRepository();

      const createAppointment = new CreateAppointmentService(
        fakeAppointmentsRepository,
        fakeUsersRepository
      );

      expect(createAppointment.execute({
        date: new Date(),
        provider_id: 'wrong provider id',
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment in the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password: '123456'
    })


    await createAppointment.execute({
      date: new Date(),
      provider_id: user?.id  || '',
    })


    expect(createAppointment.execute({
      date: new Date(),
      provider_id: user?.id  || '',
    })).rejects.toBeInstanceOf(AppError);


  })





});
