import { v4 } from "uuid";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    cpf,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      cpf,
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.cpf === cpf);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.email === email);

    return user;
  }
}

export { FakeUsersRepository };
