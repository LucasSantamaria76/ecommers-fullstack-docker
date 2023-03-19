export interface IUser {
  id?: string;
  email: string;
  password: string;
  profile?: IProfile;
}

export interface IProfile {
  id?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  province?: string;
  adress?: string;
  dni?: string;
  createdAt?: string;
  updatedAt?: string;
  favorites?: string[];
}
