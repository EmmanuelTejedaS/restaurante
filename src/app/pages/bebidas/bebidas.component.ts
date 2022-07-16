import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss'],
})
export class BebidasComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  salirDeCarrit(){
    this.navCtrl.navigateForward('/');
  }

}
