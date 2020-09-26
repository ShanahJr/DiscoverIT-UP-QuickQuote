import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QteListAddItemPage } from './qte-list-add-item.page';

describe('QteListAddItemPage', () => {
  let component: QteListAddItemPage;
  let fixture: ComponentFixture<QteListAddItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteListAddItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QteListAddItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
