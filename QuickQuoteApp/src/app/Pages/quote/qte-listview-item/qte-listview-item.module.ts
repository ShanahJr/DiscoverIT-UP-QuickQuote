import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QteListviewItemPageRoutingModule } from './qte-listview-item-routing.module';

import { QteListviewItemPage } from './qte-listview-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QteListviewItemPageRoutingModule
  ],
  declarations: [QteListviewItemPage]
})
export class QteListviewItemPageModule {}
