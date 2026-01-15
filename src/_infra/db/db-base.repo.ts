import { InsertObject } from 'kysely';
import { Repository } from '../../_lib/protocols/repo';
import { DbContext } from '@/src/_infra/db';
import { Database } from '@/src/_infra/db/schemas';

export abstract class BaseDbRepository<
	TModel extends InsertObject<Database, keyof Database>,
> implements Repository<TModel>
{
	constructor(
		protected database: DbContext,
		protected table: keyof Database,
	) {}

	async create(input: TModel): Promise<TModel> {
		const result = await this.database
			.insertInto(this.table)
			.values(input)
			.returningAll()
			.executeTakeFirst();

		return result as TModel;
	}

	async findOne(id: string): Promise<TModel | null> {
		const result = await this.database
			.selectFrom(this.table)
			.selectAll()
			.where('id', '=', id)
			.executeTakeFirst();

		return result as TModel;
	}

	async findMany(
		offset: number,
		limit: number,
	): Promise<{ data: TModel[]; total: number }> {
		const data = await this.database
			.selectFrom(this.table)
			.selectAll()
			.offset(offset)
			.limit(limit)
			.execute();

		const count = await this.database
			.selectFrom(this.table)
			.select(({ fn }) => fn.countAll<number>().as('total'))
			.executeTakeFirst();

		return {
			data: data.map((item) => item as TModel),
			total: count?.total ?? 0,
		};
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.database
			.deleteFrom(this.table)
			.where('id', '=', id)
			.executeTakeFirst();

		return result.numDeletedRows > 0;
	}
}
