import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menuoption',
  templateUrl: './menuoption.component.html',
  styleUrls: ['./menuoption.component.scss'],
})
export class MenuoptionComponent implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

}
