/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Malteadas } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-malteadas',
  templateUrl: './malteadas.component.html',
  styleUrls: ['./malteadas.component.scss'],
})
export class MalteadasComponent implements OnInit {
  private path = 'malteadas/';
  malteadas: Malteadas[] = [];
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
    this.firestoreService.getCollection<Malteadas>(this.path).subscribe(   res => {
      this.malteadas = res;
      console.log('malteadas', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}
}
