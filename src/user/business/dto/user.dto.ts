import { z } from 'zod';
import { UserRole, userSchema } from '../../domain/user';

export const createUserSchema = userSchema
	.pick({
		name: true,
		email: true,
	})
	.extend({ password: z.string().min(6) });

export const userResponseSchema = userSchema.pick({
	id: true,
	name: true,
	role: true,
	email: true,
});

export const fetchUsersResponseSchema = z.object({
	users: z.array(userResponseSchema),
	total: z.number().int(),
	limit: z.number().int(),
	page: z.number().int(),
	totalPages: z.number().int(),
});

export type CreateUserDTO = z.input<typeof createUserSchema>;
export type UserResponseDTO = z.output<typeof userResponseSchema>;
export type FetchUsersResponseDTO = z.output<typeof fetchUsersResponseSchema>;
