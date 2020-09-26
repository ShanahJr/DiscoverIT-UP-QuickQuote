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
  },  {
    path: 'qte-list-add-item',
    loadChildren: () => import('./qte-list-add-item/qte-list-add-item.module').then( m => m.QteListAddItemPageModule)
  },
  {
    path: 'qte-listview-item',
    loadChildren: () => import('./qte-listview-item/qte-listview-item.module').then( m => m.QteListviewItemPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotePageRoutingModule {}
