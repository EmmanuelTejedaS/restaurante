import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
// eslint-disable-next-line max-len
import { Postres, Producto, Bebidas, Quesadillas, Antojitos, Snacks, Ensaladas, Frappes, Tes, Malteadas, Licuados, Crepas, Waffles, Helados, Hotdogs, Desayunos, Huevos } from '../../models';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-config-productos',
  templateUrl: './config-productos.component.html',
  styleUrls: ['./config-productos.component.scss'],
})
export class ConfigProductosComponent implements OnInit {

  loading: any;
  productos: Producto[] = [];
  postres: Postres[] = [];
  newProducto: Producto;
  newPostres: Postres;
  enableNewProductos = false;
  enableNewPostres = false;
  newImage = '';
  newFile: '';
  path = 'productos/';
  newImagePostres = '';
  newFilePostres: '';
  pathPostres = 'postres/';

  bebidas: Bebidas[] = [];
  newBebidas: Bebidas;
  enableNewBebidas = false;
  newImageBebidas = '';
  newFileBebidas: '';
  pathBebidas = 'bebidas/';

  quesadillas: Quesadillas[] = [];
  newQuesadillas: Quesadillas;
  enableNewQuesadillas = false;
  newImageQuesadillas = '';
  newFileQuesadillas: '';
  pathQuesadillas = 'quesadillas/';

  antojitos: Antojitos[] = [];
  newAntojitos: Antojitos;
  enableNewAntojitos = false;
  newImageAntojitos = '';
  newFileAntojitos: '';
  pathAntojitos = 'antojitos/';

  snacks: Snacks[] = [];
  newSnacks: Snacks;
  enableNewSnacks = false;
  newImageSnacks = '';
  newFileSnacks: '';
  pathSnacks = 'snacks/';

  ensaladas: Ensaladas[] = [];
  newEnsaladas: Ensaladas;
  enableNewEnsaladas = false;
  newImageEnsaladas = '';
  newFileEnsaladas: '';
  pathEnsaladas = 'ensaladas/';

  frappes: Frappes[] = [];
  newFrappes: Frappes;
  enableNewFrappes = false;
  newImageFrappes= '';
  newFileFrappes: '';
  pathFrappes = 'frappes';

  tes: Tes[] = [];
  newTes: Tes;
  enableNewTes = false;
  newImageTes= '';
  newFileTes: '';
  pathTes = 'tes';

  malteadas: Malteadas[] = [];
  newMalteadas: Malteadas;
  enableNewMalteadas = false;
  newImageMalteadas= '';
  newFileMalteadas: '';
  pathMalteadas = 'malteadas';

  licuados: Licuados[] = [];
  newLicuados: Licuados;
  enableNewLicuados = false;
  newImageLicuados= '';
  newFileLicuados: '';
  pathLicuados = 'licuados';

  crepas: Crepas[] = [];
  newCrepas: Crepas;
  enableNewCrepas = false;
  newImageCrepas= '';
  newFileCrepas: '';
  pathCrepas = 'crepas';

  waffles: Waffles[] = [];
  newWaffles: Waffles;
  enableNewWaffles = false;
  newImageWaffles= '';
  newFileWaffles: '';
  pathWaffles= 'waffles';

  helados: Helados[] = [];
  newHelados: Helados;
  enableNewHelados = false;
  newImageHelados= '';
  newFileHelados: '';
  pathHelados= 'helados';

  hotdogs: Hotdogs[] = [];
  newHotdogs: Hotdogs;
  enableNewHotdogs = false;
  newImageHotdogs= '';
  newFileHotdogs: '';
  pathHotdogs= 'hotdogs';

  desayunos: Desayunos[] = [];
  newDesayunos: Desayunos;
  enableNewDesayunos = false;
  newImageDesayunos= '';
  newFileDesayunos: '';
  pathDesayunos= 'desayunos';

  huevos: Huevos[] = [];
  newHuevos: Huevos;
  enableNewHuevos= false;
  newImageHuevos= '';
  newFileHuevos: '';
  pathHuevos= 'huevos';

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) {
              }

  ngOnInit() {
    this.getProductos();
    this.getProductosPostres();
    this.getProductosBebidas();
    this.getProductosQuesadillas();
    this.getProductosAntojitos();
    this.getProductosSnacks();
    this.getProductosEnsaladas();
    this.getProductosFrappes();
    this.getProductosTes();
    this.getProductosMalteadas();
    this.getProductosLicuados();
    this.getProductosCrepas();
    this.getProductosWaffles();
    this.getProductosHelados();
    this.getProductosHotdogs();
    this.getProductosDesayunos();
    this.getProductosHuevos();
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  async guardarProducto() {
    const path = 'productos';
    const name = this.newProducto.nombre;
    const precio = this.newProducto.precio;
    const foto = this.newProducto.foto;
    if(name.length && foto.length && precio){
      this.presentLoading();
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newProducto.foto = res;
      console.log('interface', this.newProducto);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.firestoreService.createDoc(this.newProducto,this.path,this.newProducto.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito');
        this.nuevo();
        this.enableNewProductos = false;
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar');
      });
    }else{
      console.log('agrega dato');
    }
  }

  async guardarPostres() {
    const path = 'postres';
    const name = this.newPostres.nombre;
    const precio = this.newPostres.precio;
    const foto = this.newPostres.foto;
    if(name.length && precio){
      this.presentLoading();
      const res = await this.firestorageService.uploadImage(this.newFilePostres, path, name);
      this.newPostres.foto = res;
      console.log('interface', this.newPostres);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.firestoreService.createDoc(this.newPostres,this.pathPostres,this.newPostres.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito');
        this.nuevoPostres();
        this.enableNewPostres = false;
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar');
      });
    }else{
      console.log('agrega dato');
    }
  }

  nuevo(){
    this.enableNewProductos = true;
    this.enableNewPostres = false;
    this.enableNewBebidas = false;
    this.newProducto= {
      nombre: '',
      precio: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
    console.log(this.newProducto.id);
  }

  nuevoPostres(){
    this.enableNewPostres = true;
    this.enableNewProductos = false;
    this.newPostres= {
      nombre: '',
      precio: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
    console.log(this.newPostres.id);
  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(   res => {
      this.productos = res;
      console.log('productos', res);
    });
  }

  getProductosPostres(){
    this.firestoreService.getCollection<Producto>(this.pathPostres).subscribe(   res => {
      this.postres = res;
      console.log('postres', res);
    });
  }

  async deleteProducto(producto: Producto){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>eliminar</strong> este producto',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
              // this.presentToast('eliminado con exito');
              console.log('borrado');
              console.log('res', res);
              this.presentToast('eliminado con exito');
              // this.alertController.dismiss();
            }).catch( error => {
                // this.presentToast('no se pude eliminar');
                console.log('no se pudo borrar');
                this.presentToast('no se pude eliminar');
                console.log('error', error);
            });
          }
        }
      ]
    });
    await alert.present();
    // this.firestoreService.deleteDoc(this.path, producto.id);
  }

  async deletePostres(postres: Postres){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>eliminar</strong> este producto',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreService.deleteDoc(this.pathPostres, postres.id).then( res => {
              // this.presentToast('eliminado con exito');
              console.log('borrado');
              console.log('res', res);
              this.presentToast('eliminado con exito');
              // this.alertController.dismiss();
            }).catch( error => {
                // this.presentToast('no se pude eliminar');
                console.log('no se pudo borrar');
                this.presentToast('no se pude eliminar');
                console.log('error', error);
            });
          }
        }
      ]
    });
    await alert.present();
    // this.firestoreService.deleteDoc(this.path, producto.id);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async newImageUpload(event: any) {
    console.log('foto');
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.newProducto.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

  async newImageUploadPostres(event: any) {
    console.log('foto');
    if (event.target.files && event.target.files[0]) {
      this.newFilePostres = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.newPostres.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

  // bebidas

  async guardarBebidas() {
    const path = 'bebidas';
    const name = this.newBebidas.nombre;
    const precio = this.newBebidas.precio;
    const foto = this.newBebidas.foto;
    if(name.length && precio){
      this.presentLoading();
      const res = await this.firestorageService.uploadImage(this.newFileBebidas, path, name);
      this.newBebidas.foto = res;
      console.log('interface', this.newBebidas);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.firestoreService.createDoc(this.newBebidas,this.pathBebidas,this.newBebidas.id).then( res => {
        console.log('guardado con exito');
        this.presentToast('guardado con exito');
        this.nuevoBebidas();
        this.enableNewBebidas = false;
        this.loading.dismiss();
      }).catch(   error => {
        console.log(error);
        this.presentToast('error al guardar');
      });
    }else{
      console.log('agrega dato');
    }
  }

  nuevoBebidas(){
    this.enableNewBebidas = true;
    this.enableNewPostres = false;
    this.enableNewProductos = false;
    this.newBebidas= {
      nombre: '',
      precio: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
    console.log(this.newBebidas.id);
  }

  getProductosBebidas(){
    this.firestoreService.getCollection<Bebidas>(this.pathBebidas).subscribe(   res => {
      this.bebidas = res;
      console.log('bebidas', res);
    });
  }

  async deleteBebidas(bebidas: Bebidas){
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>eliminar</strong> este producto',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreService.deleteDoc(this.pathBebidas, bebidas.id).then( res => {
              // this.presentToast('eliminado con exito');
              console.log('borrado');
              console.log('res', res);
              this.presentToast('eliminado con exito');
              // this.alertController.dismiss();
            }).catch( error => {
                // this.presentToast('no se pude eliminar');
                console.log('no se pudo borrar');
                this.presentToast('no se pude eliminar');
                console.log('error', error);
            });
          }
        }
      ]
    });
    await alert.present();
    // this.firestoreService.deleteDoc(this.path, producto.id);
  }

  async newImageUploadBebidas(event: any) {
    console.log('foto');
    if (event.target.files && event.target.files[0]) {
      this.newFileBebidas = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.newBebidas.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
  }

// Quesadillas

async guardarQuesadillas() {
  const path = 'quesadillas';
  const name = this.newQuesadillas.nombre;
  const precio = this.newQuesadillas.precio;
  const foto = this.newQuesadillas.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileQuesadillas, path, name);
    this.newQuesadillas.foto = res;
    console.log('interface', this.newQuesadillas);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newQuesadillas,this.pathQuesadillas,this.newQuesadillas.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoQuesadillas();
      this.enableNewQuesadillas = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoQuesadillas(){
  this.enableNewQuesadillas = true;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newQuesadillas= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newQuesadillas.id);
}

getProductosQuesadillas(){
  this.firestoreService.getCollection<Quesadillas>(this.pathQuesadillas).subscribe(   res => {
    this.quesadillas = res;
    console.log('quesadillas', res);
  });
}

async deleteQuesadillas(quesadillas: Quesadillas){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathQuesadillas, quesadillas.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadQuesadillas(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileQuesadillas = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newQuesadillas.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// Antojitos

async guardarAntojitos() {
  const path = 'antojitos';
  const name = this.newAntojitos.nombre;
  const precio = this.newAntojitos.precio;
  const foto = this.newAntojitos.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileAntojitos, path, name);
    this.newAntojitos.foto = res;
    console.log('interface', this.newAntojitos);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newAntojitos,this.pathAntojitos,this.newAntojitos.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoAntojitos();
      this.enableNewAntojitos = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoAntojitos(){
  this.enableNewAntojitos = true;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newAntojitos= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newAntojitos.id);
}

getProductosAntojitos(){
  this.firestoreService.getCollection<Antojitos>(this.pathAntojitos).subscribe(   res => {
    this.antojitos = res;
    console.log('antojitos', res);
  });
}

async deleteAntojitos(antojitos: Antojitos){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathAntojitos, antojitos.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadAntojitos(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileAntojitos = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newAntojitos.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// snacks

async guardarSnacks() {
  const path = 'snacks';
  const name = this.newSnacks.nombre;
  const precio = this.newSnacks.precio;
  const foto = this.newSnacks.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileSnacks, path, name);
    this.newSnacks.foto = res;
    console.log('interface', this.newSnacks);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newSnacks,this.pathSnacks,this.newSnacks.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoSnacks();
      this.enableNewSnacks = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoSnacks(){
  this.enableNewSnacks = true;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newSnacks= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newSnacks.id);
}

getProductosSnacks(){
  this.firestoreService.getCollection<Snacks>(this.pathSnacks).subscribe(   res => {
    this.snacks = res;
    console.log('snacks', res);
  });
}

async deleteSnacks(snacks: Snacks){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathSnacks, snacks.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadSnacks(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileSnacks = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newSnacks.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// ensaladas

async guardarEnsaladas() {
  const path = 'ensaladas';
  const name = this.newEnsaladas.nombre;
  const precio = this.newEnsaladas.precio;
  const foto = this.newEnsaladas.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileEnsaladas, path, name);
    this.newEnsaladas.foto = res;
    console.log('interface', this.newEnsaladas);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newEnsaladas,this.pathEnsaladas,this.newEnsaladas.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoEnsaladas();
      this.enableNewEnsaladas = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoEnsaladas(){
  this.enableNewEnsaladas = true;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newEnsaladas= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newEnsaladas.id);
}

getProductosEnsaladas(){
  this.firestoreService.getCollection<Ensaladas>(this.pathEnsaladas).subscribe(   res => {
    this.ensaladas = res;
    console.log('ensaladas', res);
  });
}

async deleteEnsaladas(ensaladas: Ensaladas){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathEnsaladas, ensaladas.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadEnsaladas(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileEnsaladas = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newEnsaladas.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// frappes

async guardarFrappes() {
  const path = 'frappes';
  const name = this.newFrappes.nombre;
  const precio = this.newFrappes.precio;
  const foto = this.newFrappes.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileFrappes, path, name);
    this.newFrappes.foto = res;
    console.log('interface', this.newFrappes);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newFrappes,this.pathFrappes,this.newFrappes.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoFrappes();
      this.enableNewFrappes = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoFrappes(){
  this.enableNewFrappes = true;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newFrappes= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newFrappes.id);
}

getProductosFrappes(){
  this.firestoreService.getCollection<Frappes>(this.pathFrappes).subscribe(   res => {
    this.frappes = res;
    console.log('frappes', res);
  });
}

async deleteFrappes(frappes: Frappes){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathFrappes, frappes.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadFrappes(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileFrappes = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newFrappes.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// tes

async guardarTes() {
  const path = 'tes';
  const name = this.newTes.nombre;
  const precio = this.newTes.precio;
  const foto = this.newTes.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileTes, path, name);
    this.newTes.foto = res;
    console.log('interface', this.newTes);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newTes,this.pathTes,this.newTes.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoTes();
      this.enableNewTes = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoTes(){
  this.enableNewTes = true;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newTes= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newTes.id);
}

getProductosTes(){
  this.firestoreService.getCollection<Tes>(this.pathTes).subscribe(   res => {
    this.tes = res;
    console.log('tes', res);
  });
}

async deleteTes(tes: Tes){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathTes, tes.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadTes(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileTes = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newTes.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// malteadas

async guardarMalteadas() {
  const path = 'malteadas';
  const name = this.newMalteadas.nombre;
  const precio = this.newMalteadas.precio;
  const foto = this.newMalteadas.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileMalteadas, path, name);
    this.newMalteadas.foto = res;
    console.log('interface', this.newMalteadas);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newMalteadas,this.pathMalteadas,this.newMalteadas.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoMalteadas();
      this.enableNewMalteadas = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoMalteadas(){
  this.enableNewMalteadas = true;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newMalteadas= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newMalteadas.id);
}

getProductosMalteadas(){
  this.firestoreService.getCollection<Malteadas>(this.pathMalteadas).subscribe(   res => {
    this.malteadas = res;
    console.log('malteadas', res);
  });
}

async deleteMalteadas(malteadas: Malteadas){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathMalteadas, malteadas.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadMalteadas(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileMalteadas = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newMalteadas.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// licuados

async guardarLicuados() {
  const path = 'licuados';
  const name = this.newLicuados.nombre;
  const precio = this.newLicuados.precio;
  const foto = this.newLicuados.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileLicuados, path, name);
    this.newLicuados.foto = res;
    console.log('interface', this.newLicuados);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newLicuados,this.pathLicuados,this.newLicuados.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoLicuados();
      this.enableNewLicuados = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoLicuados(){
  this.enableNewLicuados = true;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newLicuados= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newLicuados.id);
}

getProductosLicuados(){
  this.firestoreService.getCollection<Licuados>(this.pathLicuados).subscribe(   res => {
    this.licuados = res;
    console.log('licuados', res);
  });
}

async deleteLicuados(licuados: Licuados){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathLicuados, licuados.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadLicuados(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileLicuados = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newLicuados.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// crepas

async guardarCrepas() {
  const path = 'crepas';
  const name = this.newCrepas.nombre;
  const precio = this.newCrepas.precio;
  const foto = this.newCrepas.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileCrepas, path, name);
    this.newCrepas.foto = res;
    console.log('interface', this.newCrepas);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newCrepas,this.pathCrepas,this.newCrepas.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoCrepas();
      this.enableNewCrepas = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoCrepas(){
  this.enableNewCrepas = true;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newCrepas= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newCrepas.id);
}

getProductosCrepas(){
  this.firestoreService.getCollection<Crepas>(this.pathCrepas).subscribe(   res => {
    this.crepas = res;
    console.log('crepas', res);
  });
}

async deleteCrepas(crepas: Crepas){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathCrepas, crepas.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadCrepas(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileCrepas = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newCrepas.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// wafles

async guardarWaffles() {
  const path = 'waffles';
  const name = this.newWaffles.nombre;
  const precio = this.newWaffles.precio;
  const foto = this.newWaffles.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileWaffles, path, name);
    this.newWaffles.foto = res;
    console.log('interface', this.newWaffles);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newWaffles,this.pathWaffles,this.newWaffles.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoWaffles();
      this.enableNewWaffles = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoWaffles(){
  this.enableNewWaffles = true;
  this.enableNewCrepas = false;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newWaffles= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newWaffles.id);
}

getProductosWaffles(){
  this.firestoreService.getCollection<Waffles>(this.pathWaffles).subscribe(   res => {
    this.waffles = res;
    console.log('wafles', res);
  });
}

async deleteWaffles(waffles: Waffles){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathWaffles, waffles.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadWaffles(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileWaffles = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newWaffles.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// helados

async guardarHelados() {
  const path = 'helados';
  const name = this.newHelados.nombre;
  const precio = this.newHelados.precio;
  const foto = this.newHelados.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileHelados, path, name);
    this.newHelados.foto = res;
    console.log('interface', this.newHelados);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newHelados,this.pathHelados,this.newHelados.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoHelados();
      this.enableNewHelados = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoHelados(){
  this.enableNewHelados = true;
  this.enableNewWaffles = false;
  this.enableNewCrepas = false;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newHelados= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newHelados.id);
}

getProductosHelados(){
  this.firestoreService.getCollection<Helados>(this.pathHelados).subscribe(   res => {
    this.helados = res;
    console.log('helados', res);
  });
}

async deleteHelados(helados: Helados){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathHelados, helados.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadHelados(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileHelados = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newHelados.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// hotdogs

async guardarHotdogs() {
  const path = 'hotdogs';
  const name = this.newHotdogs.nombre;
  const precio = this.newHotdogs.precio;
  const foto = this.newHotdogs.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileHotdogs, path, name);
    this.newHotdogs.foto = res;
    console.log('interface', this.newHotdogs);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newHotdogs,this.pathHotdogs,this.newHotdogs.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoHotdogs();
      this.enableNewHotdogs = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoHotdogs(){
  this.enableNewHotdogs = true;
  this.enableNewHelados = false;
  this.enableNewWaffles = false;
  this.enableNewCrepas = false;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newHotdogs= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newHotdogs.id);
}

getProductosHotdogs(){
  this.firestoreService.getCollection<Hotdogs>(this.pathHotdogs).subscribe(   res => {
    this.hotdogs = res;
    console.log('hotdogs', res);
  });
}

async deleteHotdogs(hotdogs: Hotdogs){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathHotdogs, hotdogs.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadHotdogs(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileHotdogs = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newHotdogs.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// dessyunos

async guardarDesayunos() {
  const path = 'desayunos';
  const name = this.newDesayunos.nombre;
  const precio = this.newDesayunos.precio;
  const foto = this.newDesayunos.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileDesayunos, path, name);
    this.newDesayunos.foto = res;
    console.log('interface', this.newDesayunos);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newDesayunos,this.pathDesayunos,this.newDesayunos.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoDesayunos();
      this.enableNewDesayunos = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoDesayunos(){
  this.enableNewDesayunos = true;
  this.enableNewHotdogs = false;
  this.enableNewHelados = false;
  this.enableNewWaffles = false;
  this.enableNewCrepas = false;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newDesayunos= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newDesayunos.id);
}

getProductosDesayunos(){
  this.firestoreService.getCollection<Desayunos>(this.pathDesayunos).subscribe(   res => {
    this.desayunos = res;
    console.log('desayunos', res);
  });
}

async deleteDesayunos(desayunos: Desayunos){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathDesayunos, desayunos.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadDesayunos(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileDesayunos = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newDesayunos.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

// huevos

async guardarHuevos() {
  const path = 'huevos';
  const name = this.newHuevos.nombre;
  const precio = this.newHuevos.precio;
  const foto = this.newHuevos.foto;
  if(name.length && precio){
    this.presentLoading();
    const res = await this.firestorageService.uploadImage(this.newFileHuevos, path, name);
    this.newHuevos.foto = res;
    console.log('interface', this.newHuevos);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    this.firestoreService.createDoc(this.newHuevos,this.pathHuevos,this.newHuevos.id).then( res => {
      console.log('guardado con exito');
      this.presentToast('guardado con exito');
      this.nuevoHuevos();
      this.enableNewHuevos = false;
      this.loading.dismiss();
    }).catch(   error => {
      console.log(error);
      this.presentToast('error al guardar');
    });
  }else{
    console.log('agrega dato');
  }
}

nuevoHuevos(){
  this.enableNewHuevos = true;
  this.enableNewDesayunos = false;
  this.enableNewHotdogs = false;
  this.enableNewHelados = false;
  this.enableNewWaffles = false;
  this.enableNewCrepas = false;
  this.enableNewLicuados = false;
  this.enableNewMalteadas = false;
  this.enableNewTes = false;
  this.enableNewFrappes = false;
  this.enableNewEnsaladas = false;
  this.enableNewSnacks = false;
  this.enableNewAntojitos = false;
  this.enableNewQuesadillas = false;
  this.enableNewBebidas = false;
  this.enableNewPostres = false;
  this.enableNewProductos = false;
  this.newHuevos= {
    nombre: '',
    precio: null,
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date()
  };
  console.log(this.newHuevos.id);
}

getProductosHuevos(){
  this.firestoreService.getCollection<Huevos>(this.pathHuevos).subscribe(   res => {
    this.huevos = res;
    console.log('huevos', res);
  });
}

async deleteHuevos(huevos: Huevos){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>eliminar</strong> este producto',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.pathHuevos, huevos.id).then( res => {
            // this.presentToast('eliminado con exito');
            console.log('borrado');
            console.log('res', res);
            this.presentToast('eliminado con exito');
            // this.alertController.dismiss();
          }).catch( error => {
              // this.presentToast('no se pude eliminar');
              console.log('no se pudo borrar');
              this.presentToast('no se pude eliminar');
              console.log('error', error);
          });
        }
      }
    ]
  });
  await alert.present();
  // this.firestoreService.deleteDoc(this.path, producto.id);
}

async newImageUploadHuevos(event: any) {
  console.log('foto');
  if (event.target.files && event.target.files[0]) {
    this.newFileHuevos = event.target.files[0];
   const reader = new FileReader();
   reader.onload = ((image) => {
       this.newHuevos.foto = image.target.result as string;
   });
   reader.readAsDataURL(event.target.files[0]);
 }
}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

}
