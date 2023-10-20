import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoDataService {
  constructor(private http: HttpClient) {}

  url: string = 'https://api.coingecko.com/api/v3/coins';

  getTrendingCurrency(currency: string) {
    return this.http.get<any>(
      `${this.url}/markets?vs_currency=${currency}&order=gecko_desc&per_page=9&page=1&sparkline=false&price_change_percentage=24h`
    );
  }

  getAllCurrency(currency: string) {
    return this.http.get<any>(
      `${this.url}/markets?vs_currency=${currency}&order=market_cup_desc&sparkline=false`
    );
  }

  getCurrencyById(coinId: string) {
    return this.http.get<any>(`${this.url}/${coinId}`);
  }
}
