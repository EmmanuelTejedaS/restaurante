import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Postres, Producto, Bebidas, Quesadillas } from '../../models';
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

  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getProductos();
    this.getProductosPostres();
    this.getProductosBebidas();
    this.getProductosQuesadillas();
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
        this.nuevo();
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
        this.nuevo();
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
      this.nuevo();
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
