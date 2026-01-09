import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['test/**/unit/**/*.spec.ts'],
				},
			},
			{
				extends: true,
				test: {
					name: 'integration',
					include: ['test/**/integration/**/*.spec.ts'],
					setupFiles: ['test/setup.ts'],
					isolate: true,
				},
			},
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '.'),
		},
	},
});
