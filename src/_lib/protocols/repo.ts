export interface Repository<TModel> {
	create(input: TModel): Promise<TModel>;
	findOne(id: string): Promise<TModel | null>;
}
