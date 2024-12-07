type AuthenticationState = UnAuthenticatedState | AuthenticatedState;

type UnAuthenticatedState = { isAuthenticated: false };
type AuthenticatedState = {
  isAuthenticated: true;
  user: UserInfo;
};

type UserInfo = {
  uid: string;
  userName: string;
  userEmail: string;
};
