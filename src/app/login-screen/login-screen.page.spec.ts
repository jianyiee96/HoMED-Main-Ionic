import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginScreenPage } from './login-screen.page';

describe('LoginScreenPage', () => {
  let component: LoginScreenPage;
  let fixture: ComponentFixture<LoginScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
