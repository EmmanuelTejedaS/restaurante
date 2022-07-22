/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Licuados } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-licuados',
  templateUrl: './licuados.component.html',
  styleUrls: ['./licuados.component.scss'],
})
export class LicuadosComponent implements OnInit {
  private path = 'licuados/';
  licuados: Licuados[] = [];
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
    this.firestoreService.getCollection<Licuados>(this.path).subscribe(   res => {
      this.licuados = res;
      console.log('licuados', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
