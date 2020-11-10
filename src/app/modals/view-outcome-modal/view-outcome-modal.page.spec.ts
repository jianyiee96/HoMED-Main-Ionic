import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOutcomeModalPage } from './view-outcome-modal.page';

describe('ViewOutcomeModalPage', () => {
  let component: ViewOutcomeModalPage;
  let fixture: ComponentFixture<ViewOutcomeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOutcomeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOutcomeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
