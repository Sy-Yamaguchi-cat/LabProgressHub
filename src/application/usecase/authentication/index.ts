import { Either } from "fp-ts/es6/Either";

import { AuthenticationState } from "@/domain/authentication";

export interface ISigninUsecase {
  signin(): Either<AuthenticationState, Error>;
}

export interface ISignoutUsecase {
  signout(): Either<AuthenticationState, Error>;
}
