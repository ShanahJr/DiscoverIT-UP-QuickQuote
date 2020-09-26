import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QteListviewItemPage } from './qte-listview-item.page';

const routes: Routes = [
  {
    path: '',
    component: QteListviewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QteListviewItemPageRoutingModule {}
