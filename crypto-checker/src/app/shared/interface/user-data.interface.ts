export interface UserData {
  id?: number;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  agreement?: boolean;
}
