import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfigProductosComponent } from './backend/config-productos/config-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { PostresComponent } from './pages/postres/postres.component';
import { MenuoptionComponent } from './pages/menuoption/menuoption.component';
import { BebidasComponent } from './pages/bebidas/bebidas.component';
import { QuesadillasComponent } from './pages/quesadillas/quesadillas.component';
import { AntojitosComponent } from './pages/antojitos/antojitos.component';
import { SnacksComponent } from './pages/snacks/snacks.component';
import { EnsaladasComponent } from './pages/ensaladas/ensaladas.component';
import { FrappesComponent } from './pages/frappes/frappes.component';
import { TesComponent } from './pages/tes/tes.component';
import { MalteadasComponent } from './pages/malteadas/malteadas.component';
import { LicuadosComponent } from './pages/licuados/licuados.component';
import { CrepasComponent } from './pages/crepas/crepas.component';
import { WafflesComponent } from './pages/waffles/waffles.component';
import { HeladosComponent } from './pages/helados/helados.component';

const isAdmin = (next: any) => map( (user: any) => !!user && 'tYBTvM5thidmtFMb82x82q1WdIU2' === user.uid);


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'config-productos', component: ConfigProductosComponent, ...canActivate(isAdmin) },
  { path: 'perfil', component: PerfilComponent},
  { path: 'postres', component: PostresComponent},
  { path: 'menuoption', component: MenuoptionComponent},
  { path: 'bebidas', component: BebidasComponent},
  { path: 'quesadillas', component: QuesadillasComponent},
  { path: 'antojitos', component: AntojitosComponent},
  { path: 'snacks', component: SnacksComponent},
  { path: 'ensaladas', component: EnsaladasComponent},
  { path: 'frappes', component: FrappesComponent},
  { path: 'tes', component: TesComponent},
  { path: 'malteadas', component: MalteadasComponent},
  { path: 'licuados', component: LicuadosComponent},
  { path: 'crepas', component:  CrepasComponent},
  { path: 'waffles', component: WafflesComponent},
  { path: 'helados', component: HeladosComponent},
  { path: '**', redirectTo: 'menuoption', pathMatch: 'full'},
  {
    path: '',
    redirectTo: 'menuoption',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
