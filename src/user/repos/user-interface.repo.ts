import { Repository } from '@/src/_lib/protocols/repo';
import { User } from '../domain/user';

export interface IUserRepository extends Repository<User> {
	findUserByEmail(email: string): Promise<User | null>;
}
