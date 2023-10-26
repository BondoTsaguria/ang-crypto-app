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

  it('should truncate description to a specified length', () => {
    const longDescription =
      'This is a long description. It has multiple sentences. It should be truncated.';
    const truncatedDescription = component.truncateDescription(
      longDescription,
      2
    );

    expect(truncatedDescription).toEqual(
      'This is a long description. It has multiple sentences'
    );
  });
});
