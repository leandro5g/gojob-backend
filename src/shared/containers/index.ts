import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "@modules/users/infra/typeorm/Repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
