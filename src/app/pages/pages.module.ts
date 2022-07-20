import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { PostresComponent } from './postres/postres.component';
import { MenuoptionComponent } from './menuoption/menuoption.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { QuesadillasComponent } from './quesadillas/quesadillas.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PostresComponent,
    MenuoptionComponent,
    BebidasComponent,
    QuesadillasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule
  ]
})
export class PagesModule { }
