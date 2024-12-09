import { Resend } from 'resend';
import { env } from './validations/validators/env.server.validator';

export const resend = new Resend(env.RESEND_KEY);
