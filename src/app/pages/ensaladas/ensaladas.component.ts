/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Ensaladas } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-ensaladas',
  templateUrl: './ensaladas.component.html',
  styleUrls: ['./ensaladas.component.scss'],
})
export class EnsaladasComponent implements OnInit {
  private path = 'ensaladas/';
  ensaladas: Ensaladas[] = [];
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
    this.firestoreService.getCollection<Ensaladas>(this.path).subscribe(   res => {
      this.ensaladas = res;
      console.log('ensaldas', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
