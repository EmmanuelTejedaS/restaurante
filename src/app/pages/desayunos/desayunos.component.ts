/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Desayunos } from '../../models';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-desayunos',
  templateUrl: './desayunos.component.html',
  styleUrls: ['./desayunos.component.scss'],
})
export class DesayunosComponent implements OnInit {
  private path = 'desayunos/';
  desayunos: Desayunos[] = [];
  idUsuario = '';
  constructor(public menu: MenuController,
    public firestoreService: FirestoreService,
    private navCtrl: NavController) {
      this.loadProductos();
     }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  loadProductos() {
    this.firestoreService.getCollection<Desayunos>(this.path).subscribe(   res => {
      this.desayunos = res;
      console.log('desayunos', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
