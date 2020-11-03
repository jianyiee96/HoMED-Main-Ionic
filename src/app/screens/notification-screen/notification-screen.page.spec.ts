import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationScreenPage } from './notification-screen.page';

describe('NotificationScreenPage', () => {
  let component: NotificationScreenPage;
  let fixture: ComponentFixture<NotificationScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
