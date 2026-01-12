import { FastifyReply, FastifyRequest } from "fastify";

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

export class HttpAdapter implements IHttpContext {
    constructor(
        private req: FastifyRequest,
        private res: FastifyReply,
    ) {}

    request(): IRequest {
        return this.req;
    }

    send(status: number, data: unknown): void {
        this.res.status(status).send(data);
    }
}
