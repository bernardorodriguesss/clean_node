import { IUserRepository } from '@/src/user/database/user-interface.repo';
import { User, UserRole } from '@/src/user/domain/user';

export class FakeUserRepository implements IUserRepository {
	public users: User[] = [];

	async create(input: User): Promise<User> {
		const user = input;
		this.users.push(user);
		return user;
	}

	async findOne(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id);
		return user ?? null;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);
		return user ?? null;
	}
}
