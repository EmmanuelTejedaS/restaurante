/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { idTokenResult } from '@angular/fire/compat/auth-guard';
import { Producto } from '../../models';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  link = '';
  selectedOption: 1;
  cantidad: 1;
  @Input() producto: Producto;
  constructor() { }

  ngOnInit() {
    this.link = 'loco';
    this.cantidad = 1;
  }

  ionChange(){
    console.log(this.selectedOption);
    this.cantidad = this.selectedOption;
    console.log(this.cantidad);
  }
}
