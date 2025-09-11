import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthenticateUserController } from './controllers/user/AuthenticateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { GetAllUserController } from './controllers/user/GetAllUserController';
import { PutUserController } from './controllers/user/PutUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { CreateAffiliatesController } from './controllers/affiliates/CreateAffiliateController';
import { GetAllAffiliateController } from './controllers/affiliates/GetAllAffiliateController';

import { isAuthenticated } from './middleware/isAuthenticated';
import { PutAffiliateController } from './controllers/affiliates/PutAffiliateController';

const router = Router();

//rotas get
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/users', isAuthenticated, new GetAllUserController().handle);
router.get('/affiliates', isAuthenticated, new GetAllAffiliateController().handle);

//rotas Post
router.post('/login', new AuthenticateUserController().handle);
router.post('/users', isAuthenticated, new CreateUserController().handle);
router.post('/affiliates', isAuthenticated, new CreateAffiliatesController().handle);

//rotas put
router.put('/users', isAuthenticated, new PutUserController().handle);
router.put('/affiliates', isAuthenticated, new PutAffiliateController().handle)

//rotas delete
router.delete('/users', isAuthenticated, new DeleteUserController().handle);

export { router };
