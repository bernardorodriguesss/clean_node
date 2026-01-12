export interface Repository<TModel> {
	create(input: TModel): Promise<TModel>;
	findOne(id: string): Promise<TModel | null>;
	findMany(
		offset: number,
		limit: number,
	): Promise<{ data: TModel[]; total: number }>;
}
