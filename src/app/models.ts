
export interface Cliente {
    uid: string;
    email: string;
    celular: string;
    foto: string;
    nombre: string;
    referencia: string;
    ubicacion: any;
 }

export interface Producto {
    nombre: string;
    precio: number;
    foto: string;
    id: string;
    fecha: Date;
}

export interface Postres {
    nombre: string;
    precio: number;
    foto: string;
    id: string;
    fecha: Date;
}

