import Appointment from '../infra/typeorm/entities/Appointment'
import {injectable, inject} from 'tsyringe';
import { startOfHour } from 'date-fns';



import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest{
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(

        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository

    ){}



    public async execute({provider_id, date}: IRequest): Promise<Appointment> {


    const appointmentDate = startOfHour(date);

    const provider = await this.usersRepository.findById(provider_id);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
   );

   console.log(findAppointmentInSameDate);

    if(findAppointmentInSameDate){
        throw  new AppError('This appointment is already booked', 400);
    }



    if(!provider){
        console.log("This provider is not exists");
        throw new AppError('This provider is not exists', 400);

    }





     const appointment = await this.appointmentsRepository.create({
        provider_id,
        date: appointmentDate
     });


     return appointment

    }
}

export default CreateAppointmentService
