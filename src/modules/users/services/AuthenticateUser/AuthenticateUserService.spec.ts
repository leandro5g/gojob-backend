import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import { FakeHashProvider } from "@shared/containers/providers/HashProvider/fakes/FakeHashProvider";
import { AppError } from "@shared/errors/AppError";
import { AuthenticateUserService } from "./AuthenticateUserService";

let authenticateUser: AuthenticateUserService;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe("AuthenticateUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it("Should be able to Authenticate user", async () => {
    await fakeUserRepository.create({
      email: "joe@joe.com",
      password: "123456",
      cpf: "32232323",
      name: "Joe due",
    });

    const response = await authenticateUser.execute({
      email: "joe@joe.com",
      password: "123456",
    });

    expect(response).toHaveProperty("user");
    expect(response).toHaveProperty("token");
  });

  it("Should not be able to Authenticate user with e-mail not found", async () => {
    await expect(
      authenticateUser.execute({
        email: "joe2@joe.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to Authenticate user", async () => {
    await fakeUserRepository.create({
      email: "joe@joe.com",
      password: "123456",
      cpf: "32232323",
      name: "Joe due",
    });

    await expect(
      authenticateUser.execute({
        email: "joe@joe.com",
        password: "password-error",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
