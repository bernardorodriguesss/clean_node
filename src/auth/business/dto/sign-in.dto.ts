import { z } from 'zod';
import { userResponseSchema } from '@/src/user/business/dto/user.dto';

export const signInSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export const signInResponseSchema = z.object({
	accessToken: z.string(),
	user: userResponseSchema,
});

export type SignInDTO = z.infer<typeof signInSchema>;
export type SignInResponseDTO = z.infer<typeof signInResponseSchema>;
