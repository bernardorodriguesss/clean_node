import { User } from './user';

export interface IUserRepository {
	createUser(input: User): Promise<User>;
	findUser(id: string): Promise<User | null>;
	findUserByEmail(email: string): Promise<User | null>;
}
