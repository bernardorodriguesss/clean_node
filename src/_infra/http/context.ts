export interface IRequest {
	body: any;
	query: any;
	params: any;
	headers: any;
	user: { id: string; role: string };
}

export interface IHttpContext {
	request(): IRequest;
	send(status: number, data: unknown): void;
}
