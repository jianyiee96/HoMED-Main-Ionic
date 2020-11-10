import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusScreenPage } from './status-screen.page';

describe('StatusScreenPage', () => {
  let component: StatusScreenPage;
  let fixture: ComponentFixture<StatusScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
