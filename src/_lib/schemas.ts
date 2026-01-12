import { z } from 'zod';

export const modelIdSchema = z.object({
	id: z.uuid(),
});

export type ModelId = z.infer<typeof modelIdSchema>;

export const paginationSchema = z.object({
	page: z.number().int().optional(),
	limit: z.number().int().optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;
