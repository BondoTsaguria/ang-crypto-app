import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit {
  coinData!: Object;
  coinId!: string;
  day: number = 1;
  currency: string = 'USD';
  constructor(
    private cryptoData: CryptoDataService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => (this.coinId = val['id']));
    this.getCoinData();
  }

  getCoinData() {
    this.cryptoData.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
      console.log(this.coinData);
    });
  }
}
