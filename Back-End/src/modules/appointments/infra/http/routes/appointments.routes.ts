import { Router, response } from 'express'


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentsController';
const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();




  appointmentsRouter.use(ensureAuthenticated);
  appointmentsRouter.post('/', appointmentsController.create);



export default appointmentsRouter;
