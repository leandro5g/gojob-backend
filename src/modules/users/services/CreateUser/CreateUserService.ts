import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IHashProvider } from "@shared/containers/providers/HashProvider/models/IHashProvider";
import { SignUpError } from "@shared/errors/SignUpError";

interface IRequest {
  name: string;
  cpf: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ cpf, email, name, password }: IRequest) {
    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail) {
      throw new SignUpError({
        message: "Email Already used",
        alreadyError: "email",
      });
    }

    const checkUserCpf = await this.usersRepository.findByCpf(cpf);

    if (checkUserCpf) {
      throw new SignUpError({
        message: "Cpf Already used",
        alreadyError: "cpf",
      });
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      cpf,
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };
