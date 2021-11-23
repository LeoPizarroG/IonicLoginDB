import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarPerfilPageRoutingModule } from './actualizar-perfil-routing.module';

import { ActualizarPerfilPage } from './actualizar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarPerfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ActualizarPerfilPage]
})
export class ActualizarPerfilPageModule {}
