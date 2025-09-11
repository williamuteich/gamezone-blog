import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthenticateUserController } from './controllers/user/AuthenticateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { GetAllUsersController } from './controllers/user/GetAllUsersController';
import { PutUserController } from './controllers/user/PutUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();
//rota de login
router.post('/login', new AuthenticateUserController().handle);

//rotas privadas
router.post('/users', isAuthenticated, new CreateUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/users', isAuthenticated, new GetAllUsersController().handle);
router.put('/users', isAuthenticated, new PutUserController().handle);
router.delete('/users', isAuthenticated, new DeleteUserController().handle);

//rotas públicas
//router.get('/users', new GetAllUsersController().handle);
//router.put('/users', new PutUserController().handle);

export { router };
