export type AuthenticationState = UnAuthenticatedState | AuthenticatedState;

export type UnAuthenticatedState = { isAuthenticated: false };
export type AuthenticatedState = {
  isAuthenticated: true;
  user: UserInfo;
};

export type UserInfo = {
  uid: string;
  userName: string;
  userEmail: string;
};
