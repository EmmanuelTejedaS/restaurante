import { Component } from '@angular/core';
import { FrirebaseauthService } from './services/frirebaseauth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  admin = false;
  usuario = false;
  idUsuario = '';

  constructor(private firebaseauthService: FrirebaseauthService,
              private navController: NavController) {
                this.initializeApp();
              }

              initializeApp() {
                console.log('hola');
                this.getUid();
              }

getUid() {
    //cambio
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
            this.idUsuario = res.uid;
              if (this.idUsuario === 'tYBTvM5thidmtFMb82x82q1WdIU2')  {
                  this.admin = true;
                  this.usuario = false;
                  console.log('admin');
                  console.log('if');
              }else{
                this.admin = false;
                this.usuario = true;
                console.log('usuario');
                console.log('else');
              }

          } else {
            this.admin = false;
            this.usuario = true;
            console.log('else3');
          }
    });
}
}
