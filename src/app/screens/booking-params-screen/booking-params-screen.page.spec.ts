import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingParamsScreenPage } from './booking-params-screen.page';

describe('BookingParamsScreenPage', () => {
  let component: BookingParamsScreenPage;
  let fixture: ComponentFixture<BookingParamsScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingParamsScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingParamsScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
