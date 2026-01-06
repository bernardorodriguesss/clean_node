import { UserRole } from '@/src/user/domain/user';
import { Generated } from 'kysely';

export interface Database {
	users: UserTable;
}

interface UserTable {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	password_hash: string;
	created_at: Generated<Date>;
}
