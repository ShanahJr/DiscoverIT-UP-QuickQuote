import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QteListAddItemPageRoutingModule } from './qte-list-add-item-routing.module';

import { QteListAddItemPage } from './qte-list-add-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QteListAddItemPageRoutingModule
  ],
  declarations: [QteListAddItemPage]
})
export class QteListAddItemPageModule {}
