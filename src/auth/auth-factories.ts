import { UserRepository } from '../user/repos/user.repo';
import { SignInUseCase } from './business/usecases';
import { SignInController } from './interface/controllers';

export class AuthFactories {
	private static repository = new UserRepository();

	static signIn() {
		const usecase = new SignInUseCase(this.repository);
		return new SignInController(usecase);
	}
}
