import { IHttpContext } from "@/src/_infra/http/context";

export interface Controller {
    handle(ctx: IHttpContext): Promise<void>;
}