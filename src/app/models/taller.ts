import {PersonaCliente} from "./personaCliente";

export class Taller {
    id?: any;
    idTaller?: any;
    nombre?: any;
    lugar?: any;
    descripcion?: any;
    responsable?: any;
    fechaInicio?: Date;
    fechaFin?: Date;
    fechaMaxInscripcion?:any;
    numParticipantes?: any;
    listaClientesTallerRequests?:PersonaCliente[]

}

export class ContarNumeroClassT{
    numero?:any;
}

export class ContarPorIdTaller{

}
