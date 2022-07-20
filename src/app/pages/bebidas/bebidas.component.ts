/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Bebidas } from '../../models';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss'],
})
export class BebidasComponent implements OnInit {
  private path = 'bebidas/';
  bebidas: Bebidas[] = [];
  idUsuario = '';
  constructor(private navCtrl: NavController,
              public menu: MenuController,
              public firestoreService: FirestoreService,) {
                this.loadProductos();
              }

  ngOnInit() {}

  loadProductos() {
    this.firestoreService.getCollection<Bebidas>(this.path).subscribe(   res => {
      this.bebidas = res;
      console.log('bebidas', res);
    });
}

  salirDeCarrit(){
    this.navCtrl.navigateForward('/');
  }

}
