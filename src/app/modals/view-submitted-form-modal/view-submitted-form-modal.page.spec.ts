import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSubmittedFormModalPage } from './view-submitted-form-modal.page';

describe('ViewSubmittedFormModalPage', () => {
  let component: ViewSubmittedFormModalPage;
  let fixture: ComponentFixture<ViewSubmittedFormModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubmittedFormModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSubmittedFormModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
