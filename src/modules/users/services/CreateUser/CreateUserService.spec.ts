import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import { FakeHashProvider } from "@shared/containers/providers/HashProvider/fakes/FakeHashProvider";
import { SignUpError } from "@shared/errors/SignUpError";
import { CreateUserService } from "./CreateUserService";

let createUser: CreateUserService;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUser.execute({
      cpf: "46855730809",
      email: "joe@joe.com",
      name: "Joe Due",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("joe@joe.com");
  });

  it("Should be able to hashed password user", async () => {
    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    const user = await createUser.execute({
      cpf: "46855730809",
      email: "joe@joe.com",
      name: "Joe Due",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(generateHash).toHaveBeenCalledWith("123456");
  });

  it("Should not be able to create a new user with using email already used", async () => {
    await createUser.execute({
      cpf: "46855730809",
      email: "joe@joe.com",
      name: "Joe Due",
      password: "123456",
    });

    await expect(
      createUser.execute({
        cpf: "46855730809",
        email: "joe@joe.com",
        name: "Joe Due",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(SignUpError);
  });

  it("Should not be able to create a new user with using cpf already used", async () => {
    await createUser.execute({
      cpf: "46855730809",
      email: "joe@joe.com",
      name: "Joe Due",
      password: "123456",
    });

    await expect(
      createUser.execute({
        cpf: "46855730809",
        email: "joe2@joe.com",
        name: "Joe Due",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(SignUpError);
  });
});
