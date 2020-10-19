import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingConsultationsScreenPage } from './waiting-consultations-screen.page';

describe('WaitingConsultationsScreenPage', () => {
  let component: WaitingConsultationsScreenPage;
  let fixture: ComponentFixture<WaitingConsultationsScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingConsultationsScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingConsultationsScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
