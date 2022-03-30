import { inject, injectable } from "tsyringe";

import { sign } from "jsonwebtoken";
import { jwtConfig } from "@config/jwt";

import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IHashProvider } from "@shared/containers/providers/HashProvider/models/IHashProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Combination password/email does not match");
    }

    const checkPassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!checkPassword) {
      throw new AppError("Combination password/email does not match");
    }

    const token = sign({}, jwtConfig.secret, {
      subject: user.id,
      expiresIn: jwtConfig.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
