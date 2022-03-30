import { getRepository, Repository } from "typeorm";
import { v4 } from "uuid";

import { User } from "../entities/User";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async create({
    cpf,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      id: v4(),
      cpf,
      email,
      name,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export { UsersRepository };
