import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from '../../models';
import { FrirebaseauthService } from '../../services/frirebaseauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    nombre: '',
    ubicacion: null,
  };

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = true;

  constructor(public menu: MenuController,
              public firebaseauthService: FrirebaseauthService,
              public firestorageService: FirestorageService,
              public firestoreService: FirestoreService,
              public alertController: AlertController,
              public toastController: ToastController,
              private navController: NavController) {

                this.firebaseauthService.stateAuth().subscribe( res => {
                  if (res !== null) {
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                 }else {
                  this.initCliente();
              }
                 });


               }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
  }

  initCliente() {
    this.uid = '';
    this.cliente = {
      uid: '',
      email: '',
      celular: '',
      foto: '',
      referencia: '',
      nombre: '',
      ubicacion: null,
    };
    console.log(this.cliente);
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.cliente.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
 }

 async registrarse(){
  const credenciales = {
    email: this.cliente.email,
    password: this.cliente.celular
  };
  if(credenciales.email.length && credenciales.password.length){
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err =>{
      console.log('error->', err);
     });
    console.log('getuid',res);
    const uid = await this.firebaseauthService.getUid();
    this.cliente.uid = uid;
    this.guardarUser();
    console.log(uid);
  }else{
    // this.toastSinDatos();
    console.log('sin datos');
  }
}

async guardarUser() {
  const path = 'Clientes';
  const name = this.cliente.nombre;
  if(this.newFile !== undefined){
  const res = await this.firestorageService.uploadImage(this.newFile, path, name);
  this.cliente.foto = res;
}
  // eslint-disable-next-line @typescript-eslint/no-shadow
  this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
      console.log('guardado con exito', res);
      this.navController.navigateForward('/optionmenu');
  }).catch(   error => {
    console.log('error', error);
  });
}


async salir(){
  this.firebaseauthService.logout();
  this.suscriberUserInfo.unsubscribe();
 }

 getUserInfo(uid: string) {
  console.log('getUserInfo');
  const path = 'Clientes';
  this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, uid).subscribe( res => {
         if (res !== undefined) {
           this.cliente = res;
         }
  });
}

ingresar(){
  const credenciales = {
    email: this.cliente.email,
    password: this.cliente.celular
  };
  if(credenciales.email.length && credenciales.password.length){
    this.firebaseauthService.login(credenciales.email, credenciales.password).then( res => {
      // this.router.navigate(['/home']);
      this.navController.navigateForward('/optionmenu');
      console.log('ingreso con exito');
  }).catch ( error =>{

  });
  }else{

  }
}


 async presentAlert() {
  const alert = await this.alertController.create({
    header: 'cerrar sesion',
    message: 'quieres cerrar la sesion?',
    buttons: [
      {
      text: 'NO',
      handler: ()=>{
        // this.toastContinuar();
        console.log('NO');
      }
    },
    {
      text: 'SI',
      handler: ()=>{
        this.salir();
        // this.toastCerrarSesion();
        console.log('gracias por comprar :)');
      }
    }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

}
