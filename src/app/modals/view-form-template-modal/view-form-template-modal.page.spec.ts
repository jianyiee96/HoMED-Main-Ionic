import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFormTemplateModalPage } from './view-form-template-modal.page';

describe('ViewFormTemplateModalPage', () => {
  let component: ViewFormTemplateModalPage;
  let fixture: ComponentFixture<ViewFormTemplateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFormTemplateModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFormTemplateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
