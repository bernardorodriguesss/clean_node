import { z } from 'zod';

export const modelIdSchema = z.object({
	id: z.uuid(),
});

export type ModelId = z.infer<typeof modelIdSchema>;
