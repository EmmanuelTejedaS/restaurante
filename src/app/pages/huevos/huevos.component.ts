/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Huevos } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-huevos',
  templateUrl: './huevos.component.html',
  styleUrls: ['./huevos.component.scss'],
})
export class HuevosComponent implements OnInit {
  private path = 'huevos/';
  huevos: Huevos[] = [];
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
    this.firestoreService.getCollection<Huevos>(this.path).subscribe(   res => {
      this.huevos = res;
      console.log('huevos', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
