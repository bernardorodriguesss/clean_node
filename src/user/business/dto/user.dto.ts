import { z } from 'zod';
import { userSchema } from '../../domain/user';

export const createUserSchema = userSchema
	.pick({
		name: true,
		email: true,
	})
	.extend({ password: z.string().min(6) });

const userResponseSchema = userSchema.pick({
	id: true,
	name: true,
	email: true,
});

export type CreateUserDTO = z.input<typeof createUserSchema>;
export type UserResponseDTO = z.output<typeof userResponseSchema>;
