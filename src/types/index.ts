export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface AuthContextType {
  userToken: string | null;
  userInfo: { email: string } | null;
  isLoading: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { item: User };
};
