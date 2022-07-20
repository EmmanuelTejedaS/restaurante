/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Quesadillas } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-quesadillas',
  templateUrl: './quesadillas.component.html',
  styleUrls: ['./quesadillas.component.scss'],
})
export class QuesadillasComponent implements OnInit {
  private path = 'quesadillas/';
  quesadillas: Quesadillas[] = [];
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
    this.firestoreService.getCollection<Quesadillas>(this.path).subscribe(   res => {
      this.quesadillas = res;
      console.log('quesadillas', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
