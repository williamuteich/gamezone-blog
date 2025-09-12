import { Router } from 'express';
import express from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthenticateUserController } from './controllers/user/AuthenticateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { GetAllUserController } from './controllers/user/GetAllUserController';
import { PutUserController } from './controllers/user/PutUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { CreateAffiliatesController } from './controllers/affiliates/CreateAffiliateController';
import { GetAllAffiliateController } from './controllers/affiliates/GetAllAffiliateController';
import { PutAffiliateController } from './controllers/affiliates/PutAffiliateController';
import { DeleteAffiliateController } from './controllers/affiliates/DeleteAffiliateController';

import { isAuthenticated } from './middleware/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

// Configurações de upload separadas por tipo
const uploadUsers = multer(uploadConfig.upload('./tmp/users'));
const uploadAffiliates = multer(uploadConfig.upload('./tmp/affiliates'));

//rotas get
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/users', isAuthenticated, new GetAllUserController().handle);
router.get('/affiliates', isAuthenticated, new GetAllAffiliateController().handle);

//rotas Post
router.post('/login', new AuthenticateUserController().handle);
router.post('/users', isAuthenticated, uploadUsers.single('avatar'), new CreateUserController().handle);
router.post('/affiliates', isAuthenticated, uploadAffiliates.single('image'), new CreateAffiliatesController().handle);

//rotas put
router.put('/users', isAuthenticated, uploadUsers.single('avatar'), new PutUserController().handle);
router.put('/affiliates', isAuthenticated, uploadAffiliates.single('image'), new PutAffiliateController().handle)

//rotas delete
router.delete('/users', isAuthenticated, new DeleteUserController().handle);
router.delete('/affiliates', isAuthenticated, new DeleteAffiliateController().handle);

export { router };
