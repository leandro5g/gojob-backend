class SignUpError {
  public readonly message: string;

  public readonly statusCode: string;

  public readonly alreadyError: "email" | "cpf";

  constructor({ message, alreadyError }: Omit<SignUpError, "statusCode">) {
    Object.assign(this, { message, alreadyError, statusCode: 400 });
  }
}

export { SignUpError };
