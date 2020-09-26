import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRepositoryScreenPage } from './form-repository-screen.page';

describe('FormRepositoryScreenPage', () => {
  let component: FormRepositoryScreenPage;
  let fixture: ComponentFixture<FormRepositoryScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRepositoryScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRepositoryScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
