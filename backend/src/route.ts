import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthenticateUserController } from './controllers/user/AuthenticateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { GetAllUsersController } from './controllers/user/GetAllUsersController';
import { PutUserController } from './controllers/user/PutUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

//rotas get
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/users', isAuthenticated, new GetAllUsersController().handle);

//rotas Post
router.post('/login', new AuthenticateUserController().handle);
router.post('/users', isAuthenticated, new CreateUserController().handle);

//rotas put
router.put('/users', isAuthenticated, new PutUserController().handle);

//rotas delete
router.delete('/users', isAuthenticated, new DeleteUserController().handle);

export { router };
