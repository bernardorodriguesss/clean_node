import { IUserRepository } from '@/src/user/repos/user-interface.repo';
import { User } from '@/src/user/domain/user';

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

	async findMany(
		offset: number,
		limit: number,
	): Promise<{ data: User[]; total: number }> {
		const users = this.users.slice(offset, offset + limit);
		return {
			data: users,
			total: this.users.length,
		};
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);
		return user ?? null;
	}
}
