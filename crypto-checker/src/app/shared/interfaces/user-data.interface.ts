import { ownedCryptoes } from './owned-cryptoes.interface';

export interface UserData {
  id?: number;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  agreement?: boolean;
  balance?: number;
  cryptocurrencies: ownedCryptoes[];
  mycurrencies: ownedCryptoes[];
}
