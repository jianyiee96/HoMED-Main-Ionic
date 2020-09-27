import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFormInstanceModalPage } from './edit-form-instance-modal.page';

describe('EditFormInstanceModalPage', () => {
  let component: EditFormInstanceModalPage;
  let fixture: ComponentFixture<EditFormInstanceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormInstanceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormInstanceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
