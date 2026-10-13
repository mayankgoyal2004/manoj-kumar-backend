import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { env } from '../config/env';
import { sendError, sendSuccess } from '../utils/response';
import { logActivity } from '../utils/auditLogger';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    if (user.status === 'Suspended') {
      return sendError(res, 'Account is suspended. Please contact administrator.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Update lastActive
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    await logActivity({
      req,
      actor: user.name,
      email: user.email,
      action: 'login',
      module: 'Auth',
      target: 'Console Login',
      kind: 'security',
    });

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          avatar: user.avatar,
          status: user.status,
        },
      },
      'Login successful'
    );
  } catch (error: any) {
    return sendError(res, error.message || 'Login failed', 500);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, department } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return sendError(res, 'A user with this email address already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name,
        role: role || 'ADMIN',
        department: department || null,
        status: 'Active',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        avatar: true,
        status: true,
        createdAt: true,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    await logActivity({
      req,
      actor: user.name,
      email: user.email,
      action: 'created',
      module: 'Users',
      target: user.name,
      kind: 'create',
    });

    return sendSuccess(res, { token, user }, 'User registered successfully', 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Registration failed', 500);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Unauthenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        avatar: true,
        status: true,
        lastActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, user, 'Current user profile');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch user', 500);
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'Unauthenticated', 401);

    const { name, email, department, avatar } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email: email.toLowerCase().trim() } : {}),
        ...(department !== undefined ? { department } : {}),
        ...(avatar !== undefined ? { avatar } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        avatar: true,
        status: true,
      },
    });

    await logActivity({
      req,
      action: 'updated',
      module: 'Account Settings',
      target: updated.name,
      kind: 'update',
    });

    return sendSuccess(res, updated, 'Account details updated successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update account', 500);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'Unauthenticated', 401);

    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) return sendError(res, 'User not found', 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return sendError(res, 'Current password does not match', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await logActivity({
      req,
      action: 'updated',
      module: 'Security',
      target: 'Password Change',
      kind: 'security',
    });

    return sendSuccess(res, null, 'Password changed successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to change password', 500);
  }
};
