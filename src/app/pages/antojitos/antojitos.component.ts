/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Antojitos } from '../../models';
import { MenuController, NavController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-antojitos',
  templateUrl: './antojitos.component.html',
  styleUrls: ['./antojitos.component.scss'],
})
export class AntojitosComponent implements OnInit {
  private path = 'antojitos/';
  antojitos: Antojitos[] = [];
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
    this.firestoreService.getCollection<Antojitos>(this.path).subscribe(   res => {
      this.antojitos = res;
      console.log('antojitos', res);
    });
}

salirDeCarrit(){
  this.navCtrl.navigateForward('/');
}

}
