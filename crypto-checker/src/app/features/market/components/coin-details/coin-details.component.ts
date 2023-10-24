import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinData } from 'src/app/shared/interfaces/coin-data.interface';
import { CryptoDataService } from 'src/app/shared/services/crypto-data.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinDetailsComponent implements OnInit {
  coinData: CoinData | null = null;
  coinId!: string;

  constructor(
    private cryptoData: CryptoDataService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.coinId = val['id'];
      this.cdr.detectChanges();
    });
    this.getCoinData();
    this.cdr.detectChanges();
  }

  getCoinData() {
    this.cryptoData.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
      console.log(this.coinData);
      this.cdr.detectChanges();
      this.coinData!.description.en = this.truncateDescription(
        this.coinData!.description.en,
        5
      );
      this.cdr.detectChanges();
    });
  }

  truncateDescription(
    description: string | undefined,
    maxLength: number
  ): string {
    if (!description) {
      return '';
    }
    const sentences = description.split('. ');
    const truncatedDescription = sentences.slice(0, maxLength).join('. ');
    return truncatedDescription;
  }
}
