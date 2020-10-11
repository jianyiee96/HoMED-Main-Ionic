import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingScreenPage } from './booking-screen.page';

describe('BookingScreenPage', () => {
  let component: BookingScreenPage;
  let fixture: ComponentFixture<BookingScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
