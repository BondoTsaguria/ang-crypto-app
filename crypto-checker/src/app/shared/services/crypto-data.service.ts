import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mainCryptoData } from '../interfaces/crypto-data.interface';
import { CoinData } from '../interfaces/coin-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CryptoDataService {
  constructor(private http: HttpClient) {}

  url: string = 'https://api.coingecko.com/api/v3/coins';

  getTrendingCurrency(currency: string): Observable<mainCryptoData[]> {
    return this.http.get<mainCryptoData[]>(
      `${this.url}/markets?vs_currency=${currency}&order=gecko_desc&per_page=9&page=1&sparkline=false&price_change_percentage=24h`
    );
  }

  getAllCurrency(currency: string): Observable<mainCryptoData[]> {
    return this.http.get<mainCryptoData[]>(
      `${this.url}/markets?vs_currency=${currency}&order=market_cup_desc&sparkline=false`
    );
  }

  getCurrencyById(coinId: string): Observable<CoinData> {
    return this.http.get<CoinData>(`${this.url}/${coinId}`);
  }
}
