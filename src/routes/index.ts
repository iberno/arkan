// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes.js';
//import roleRoutes from './roleRoutes.js';
//import permissionRoutes from './permissionRoutes.js';

const router = Router();

router.use('/users', userRoutes);
//router.use('/roles', roleRoutes);
//router.use('/permissions', permissionRoutes);

export default router;
