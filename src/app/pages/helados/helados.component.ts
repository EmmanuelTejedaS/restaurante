/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Helados } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-helados',
  templateUrl: './helados.component.html',
  styleUrls: ['./helados.component.scss'],
})
export class HeladosComponent implements OnInit {
  private path = 'helados/';
  helados: Helados[] = [];
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
    this.firestoreService.getCollection<Helados>(this.path).subscribe(   res => {
      this.helados = res;
      console.log('helados', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
