import { Component, OnInit } from '@angular/core';
import { TrendingCurrencyService } from '../services/trending-currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingData!: any[];

  constructor(private trendingCurrency: TrendingCurrencyService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.trendingCurrency.getTrendingCurrency('USD').subscribe((res) => {
      console.log(res);
      this.trendingData = res;
    });
  }
}
