/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Hotdogs } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-hotdogs',
  templateUrl: './hotdogs.component.html',
  styleUrls: ['./hotdogs.component.scss'],
})
export class HotdogsComponent implements OnInit {
  private path = 'hotdogs/';
  hotdogs: Hotdogs[] = [];
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
    this.firestoreService.getCollection<Hotdogs>(this.path).subscribe(   res => {
      this.hotdogs = res;
      console.log('hotdogs', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
