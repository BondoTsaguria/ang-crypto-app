import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDetailsComponent } from './coin-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoinDetailsComponent', () => {
  let component: CoinDetailsComponent;
  let fixture: ComponentFixture<CoinDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CoinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
