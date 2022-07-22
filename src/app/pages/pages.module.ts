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
import { AntojitosComponent } from './antojitos/antojitos.component';
import { SnacksComponent } from './snacks/snacks.component';
import { EnsaladasComponent } from './ensaladas/ensaladas.component';
import { FrappesComponent } from './frappes/frappes.component';
import { TesComponent } from './tes/tes.component';
import { MalteadasComponent } from './malteadas/malteadas.component';
import { LicuadosComponent } from './licuados/licuados.component';
import { CrepasComponent } from './crepas/crepas.component';
import { WafflesComponent } from './waffles/waffles.component';
import { HeladosComponent } from './helados/helados.component';
import { HotdogsComponent } from './hotdogs/hotdogs.component';
import { DesayunosComponent } from './desayunos/desayunos.component';
import { HuevosComponent } from './huevos/huevos.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PostresComponent,
    MenuoptionComponent,
    BebidasComponent,
    QuesadillasComponent,
    AntojitosComponent,
    SnacksComponent,
    EnsaladasComponent,
    FrappesComponent,
    TesComponent,
    MalteadasComponent,
    LicuadosComponent,
    CrepasComponent,
    WafflesComponent,
    HeladosComponent,
    HotdogsComponent,
    DesayunosComponent,
    HuevosComponent
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
