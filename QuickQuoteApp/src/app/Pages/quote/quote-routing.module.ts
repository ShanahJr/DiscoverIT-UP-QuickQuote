import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotePage } from './quote.page';

const routes: Routes = [
  {
    path: '',
    component: QuotePage
  },
  {
    path: 'quote-list',
    loadChildren: () => import('./quote-list/quote-list.module').then( m => m.QuoteListPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotePageRoutingModule {}
