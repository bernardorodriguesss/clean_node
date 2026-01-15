import { UserRepository } from './repos/user.repo';
import {
	CreateUserUseCase,
	DeleteUserUseCase,
	FetchUsersUseCase,
	GetUserUseCase,
} from './business/usecases';
import {
	CreateUserController,
	DeleteUserController,
	FetchUsersController,
	GetUserProfileController,
} from './interface/controllers';

export class UserFactories {
	private static repository = new UserRepository();

	static createUser() {
		const usecase = new CreateUserUseCase(this.repository);
		return new CreateUserController(usecase);
	}

	static fetchUsers() {
		const usecase = new FetchUsersUseCase(this.repository);
		return new FetchUsersController(usecase);
	}

	static getUserProfile() {
		const usecase = new GetUserUseCase(this.repository);
		return new GetUserProfileController(usecase);
	}

	static deleteUser() {
		const usecase = new DeleteUserUseCase(this.repository);
		return new DeleteUserController(usecase);
	}
}
