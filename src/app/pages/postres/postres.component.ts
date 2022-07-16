/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Postres } from '../../models';

@Component({
  selector: 'app-postres',
  templateUrl: './postres.component.html',
  styleUrls: ['./postres.component.scss'],
})
export class PostresComponent implements OnInit {
  private path = 'postres/';
  postres: Postres[] = [];
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
    this.firestoreService.getCollection<Postres>(this.path).subscribe(   res => {
      this.postres = res;
      console.log('postres', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
