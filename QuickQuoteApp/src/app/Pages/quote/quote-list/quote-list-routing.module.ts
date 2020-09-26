import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteListPage } from './quote-list.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteListPageRoutingModule {}
