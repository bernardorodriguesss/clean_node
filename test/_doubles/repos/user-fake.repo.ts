import { User } from '@/src/user/domain/user';
import { IUserRepository } from '@/src/user/domain/user-interface.repo';

export class FakeUserRepository implements IUserRepository {
	public users: User[] = [];

	async createUser(input: User): Promise<User> {
		const user = input;
		this.users.push(user);
		return user;
	}

	async findUser(id: string): Promise<User | null> {
		return this.users.find((user) => user.id === id) || null;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return this.users.find((user) => user.email === email) || null;
	}
}
