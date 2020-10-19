import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletedConsultationsScreenPage } from './completed-consultations-screen.page';

describe('CompletedConsultationsScreenPage', () => {
  let component: CompletedConsultationsScreenPage;
  let fixture: ComponentFixture<CompletedConsultationsScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedConsultationsScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedConsultationsScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
