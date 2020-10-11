import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSlotsScreenPage } from './booking-slots-screen.page';

describe('BookingSlotsScreenPage', () => {
  let component: BookingSlotsScreenPage;
  let fixture: ComponentFixture<BookingSlotsScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSlotsScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSlotsScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
