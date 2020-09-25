import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormScreenPage } from './form-screen.page';

describe('FormScreenPage', () => {
  let component: FormScreenPage;
  let fixture: ComponentFixture<FormScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
