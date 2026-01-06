import { User, UserRole } from '@/src/user/domain/user';
import { randomUUID } from 'node:crypto';

export function makeUser(overrides?: Partial<User>): User {
	return {
		id: randomUUID(),
		name: 'John Doe',
		email: 'johndoe@email.com',
		role: UserRole.USER,
		password_hash: '1',
		created_at: new Date(),
		...overrides,
	};
}
