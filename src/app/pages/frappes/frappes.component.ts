/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Frappes } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-frappes',
  templateUrl: './frappes.component.html',
  styleUrls: ['./frappes.component.scss'],
})
export class FrappesComponent implements OnInit {
  private path = 'frappes/';
  frappes: Frappes[] = [];
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
    this.firestoreService.getCollection<Frappes>(this.path).subscribe(   res => {
      this.frappes = res;
      console.log('frappes', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
