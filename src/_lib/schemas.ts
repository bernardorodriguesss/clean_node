import { z } from 'zod';

export const modelIdSchema = z.object({
	id: z.uuid(),
});

export type ModelId = z.infer<typeof modelIdSchema>;

export const paginationSchema = z.object({
	page: z.coerce.number().int().optional().default(1),
	limit: z.coerce.number().int().max(100).optional().default(10),
});

export type Pagination = z.infer<typeof paginationSchema>;
