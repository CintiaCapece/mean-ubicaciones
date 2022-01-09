export class Ubicacion {
    _id?: number;
    rubro: string;
    direccion: string;
    localidad: string;

    constructor (rubro: string, direccion: string, localidad: string){
        this.rubro = rubro;
        this.direccion = direccion;
        this.localidad = localidad;
    }
}