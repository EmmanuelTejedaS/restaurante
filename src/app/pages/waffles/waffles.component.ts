/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Waffles } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-waffles',
  templateUrl: './waffles.component.html',
  styleUrls: ['./waffles.component.scss'],
})
export class WafflesComponent implements OnInit {
  private path = 'waffles/';
  waffles: Waffles[] = [];
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
    this.firestoreService.getCollection<Waffles>(this.path).subscribe(   res => {
      this.waffles = res;
      console.log('waffles', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
