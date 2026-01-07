import { User } from '../domain/user';
import { DbContext, db } from '@/src/_infra/db';
import { IUserRepository } from './user-interface.repo';
import { BaseDbRepository } from '@/src/_infra/db/db-base.repo';

export class UserRepository
	extends BaseDbRepository<User>
	implements IUserRepository
{
	constructor(database: DbContext = db) {
		super(database, 'users');
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const user = await this.database
			.selectFrom(this.table)
			.selectAll()
			.where('email', '=', email)
			.executeTakeFirst();

		return user ?? null;
	}
}
