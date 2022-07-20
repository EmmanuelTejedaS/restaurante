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

const isAdmin = (next: any) => map( (user: any) => !!user && 'tYBTvM5thidmtFMb82x82q1WdIU2' === user.uid);


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'config-productos', component: ConfigProductosComponent, ...canActivate(isAdmin) },
  { path: 'perfil', component: PerfilComponent},
  { path: 'postres', component: PostresComponent},
  { path: 'menuoption', component: MenuoptionComponent},
  { path: 'bebidas', component: BebidasComponent},
  { path: 'quesadillas', component: QuesadillasComponent},
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
