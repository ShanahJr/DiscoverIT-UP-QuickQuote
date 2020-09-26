import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QteListAddItemPage } from './qte-list-add-item.page';

const routes: Routes = [
  {
    path: '',
    component: QteListAddItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QteListAddItemPageRoutingModule {}
