import { ISigninUsecase, ISignoutUsecase } from "./index";
import { AuthenticationState } from "@/domain/authentication";
import { Either } from "fp-ts/es6/Either";

export interface IAuthenticationProvider {
  signin(): Either<AuthenticationState, Error>;
  signout(): Either<AuthenticationState, Error>;
}

export class SigininUsecase implements ISigninUsecase {
  private provider: IAuthenticationProvider;
  constructor(provider: IAuthenticationProvider) {
    this.provider = provider;
  }
  signin() {
    return this.provider.signin();
  }
}

export class SignoutUsecase implements ISignoutUsecase {
  private provider: IAuthenticationProvider;
  constructor(provider: IAuthenticationProvider) {
    this.provider = provider;
  }
  signout() {
    return this.provider.signout();
  }
}
