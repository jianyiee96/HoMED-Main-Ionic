import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultationScreenPage } from './consultation-screen.page';

describe('ConsultationScreenPage', () => {
  let component: ConsultationScreenPage;
  let fixture: ComponentFixture<ConsultationScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
