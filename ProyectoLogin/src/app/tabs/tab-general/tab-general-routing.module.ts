import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabGeneralPage } from './tab-general.page';

const routes: Routes = [
  {
    path: 'tab-general',
    component: TabGeneralPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./../../tabs/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'actualizar-perfil',
        loadChildren: () => import('./../../tabs/actualizar-perfil/actualizar-perfil.module').then( m => m.ActualizarPerfilPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabGeneralPageRoutingModule { }
