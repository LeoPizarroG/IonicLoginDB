import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabGeneralPageRoutingModule } from './tab-general-routing.module';

import { TabGeneralPage } from './tab-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabGeneralPageRoutingModule
  ],
  declarations: [TabGeneralPage]
})
export class TabGeneralPageModule {}
