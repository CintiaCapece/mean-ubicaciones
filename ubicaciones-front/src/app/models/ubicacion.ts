export class Ubicacion {
    _id?: string;
    rubro: string;
    nombre: string;
    direccion: string;
    localidad: string;
    provincia: string;
    pais: string;

    constructor (rubro: string, nombre: string, direccion: string, localidad: string, provincia: string, pais: string){
        this.rubro = rubro;
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
        this.pais = pais;
    }
}