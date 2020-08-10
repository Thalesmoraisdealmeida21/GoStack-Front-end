import {container} from 'tsyringe';


import IHashProvider from './HashProvider/models/IHashProvider';

import BCrypthashProvider from './HashProvider/implementations/BCryptHashProvider';


container.registerSingleton<IHashProvider>('HashProvider', BCrypthashProvider);
