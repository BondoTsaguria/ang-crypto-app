import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  trendingData!: any[];

  constructor(
    private cryptoData: CryptoDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
    this.cdr.detectChanges();
  }

  getData() {
    this.cryptoData.getTrendingCurrency('USD').subscribe((res) => {
      this.trendingData = res;
      this.cdr.detectChanges();
    });
  }
}
