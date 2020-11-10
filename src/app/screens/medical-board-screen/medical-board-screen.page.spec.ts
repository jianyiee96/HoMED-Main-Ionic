import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalBoardScreenPage } from './medical-board-screen.page';

describe('MedicalBoardScreenPage', () => {
  let component: MedicalBoardScreenPage;
  let fixture: ComponentFixture<MedicalBoardScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalBoardScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalBoardScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
