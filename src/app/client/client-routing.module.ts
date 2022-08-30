import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'client', redirectTo: 'client/index', pathMatch: 'full'},
  { path: 'client/index', component: IndexComponent },
  { path: 'client/:clientId/view', component: ViewComponent },
  { path: 'client/create', component: CreateComponent },
  { path: 'client/:clientId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
