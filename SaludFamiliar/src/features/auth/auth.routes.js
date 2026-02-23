import { Router } from 'express';
import * as ctrl from './auth.controller.js';
import { authMiddleware } from '../../shared/auth.js';

export const authRoutes = Router();

authRoutes.post('/login', ctrl.login);
authRoutes.get('/me', authMiddleware, ctrl.me);
