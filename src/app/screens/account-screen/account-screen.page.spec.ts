import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountScreenPage } from './account-screen.page';

describe('AccountScreenPage', () => {
  let component: AccountScreenPage;
  let fixture: ComponentFixture<AccountScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
