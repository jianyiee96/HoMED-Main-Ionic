import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSummaryModalPage } from './booking-summary-modal.page';

describe('BookingSummaryModalPage', () => {
  let component: BookingSummaryModalPage;
  let fixture: ComponentFixture<BookingSummaryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSummaryModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSummaryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
