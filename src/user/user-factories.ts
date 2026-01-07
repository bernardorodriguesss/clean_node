import { UserRepository } from "./repos/user.repo";
import { CreateUserUseCase, GetUserUseCase } from "./business/usecases";
import {
    CreateUserController,
    GetUserProfileController,
} from "./interface/controllers";

export class UserFactories {
    private static repository = new UserRepository();

    static createUser() {
        const usecase = new CreateUserUseCase(this.repository);
        return new CreateUserController(usecase);
    }

    static getUserProfile() {
        const usecase = new GetUserUseCase(this.repository);
        return new GetUserProfileController(usecase);
    }
}
