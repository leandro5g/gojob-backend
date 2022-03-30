import { User } from "@modules/users/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
}

export { IUsersRepository };
