/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Crepas } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-crepas',
  templateUrl: './crepas.component.html',
  styleUrls: ['./crepas.component.scss'],
})
export class CrepasComponent implements OnInit {
  private path = 'crepas/';
  crepas: Crepas[] = [];
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
    this.firestoreService.getCollection<Crepas>(this.path).subscribe(   res => {
      this.crepas = res;
      console.log('crepas', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
