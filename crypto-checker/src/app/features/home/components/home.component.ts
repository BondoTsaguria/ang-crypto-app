import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingData!: any[];

  constructor(private cryptoData: CryptoDataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.cryptoData.getTrendingCurrency('USD').subscribe((res) => {
      this.trendingData = res;
    });
  }
}
