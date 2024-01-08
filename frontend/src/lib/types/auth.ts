export interface AuthProps {
  session: boolean;
  user?: {
    username?: string;
    password?: string;
    email?: string;
    image?: string;
  };
}

export interface AuthProviderProps {
  children: React.ReactNode;
  session: AuthProps['session'];
}
