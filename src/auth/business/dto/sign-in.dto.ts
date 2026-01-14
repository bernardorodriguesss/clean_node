import { z } from 'zod';

export const signInSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export const signInResponseSchema = z.object({
	accessToken: z.string(),
});

export type SignInDTO = z.infer<typeof signInSchema>;
export type SignInResponseDTO = z.infer<typeof signInResponseSchema>;
