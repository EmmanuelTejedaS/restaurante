import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigProductosComponent } from './config-productos/config-productos.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfigProductosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class BackendModule { }
