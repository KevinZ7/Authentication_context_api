export interface AuthData {
  access: string;
  refresh: string;
  loggedIn: boolean;
}

export interface AuthContextType{
  auth: AuthData | null;
  setAuth: ((data: AuthData) => void) | ((prevState: any) => AuthData);
}
