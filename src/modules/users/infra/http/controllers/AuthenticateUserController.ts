import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "@modules/users/services/AuthenticateUser/AuthenticateUserService";

class AuthenticateUserController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}

export { AuthenticateUserController };
