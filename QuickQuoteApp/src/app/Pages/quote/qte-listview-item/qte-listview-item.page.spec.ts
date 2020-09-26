import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QteListviewItemPage } from './qte-listview-item.page';

describe('QteListviewItemPage', () => {
  let component: QteListviewItemPage;
  let fixture: ComponentFixture<QteListviewItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteListviewItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QteListviewItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
