import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
// import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {
    path: 'create',
    loadChildren: () => import('./components/create-item/create-item.module')
      .then(module => module.CreateItemModule)
  },
  {path: 'item/:id', component: DetailComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
