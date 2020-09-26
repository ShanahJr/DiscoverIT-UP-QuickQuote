import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuoteListPage } from './quote-list.page';

describe('QuoteListPage', () => {
  let component: QuoteListPage;
  let fixture: ComponentFixture<QuoteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
