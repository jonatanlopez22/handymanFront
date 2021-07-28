export class Servicio {

    id:number;
    idEmpleado: number;
    idServicio: number;
    horaI: number;
    horaF: number;
    horasT: number;
    fechaF:String;
    fechaI:String;
    semana:number;

    constructor(listar: { id: number; idEmpleado: number; idServicio: number; horaI: number; horaF: number; horasT: number; fechaI: String;fechaF: String; semana: number; }) {

        this.id = listar.id;
        this.idEmpleado = listar.idEmpleado;
        this.idServicio = listar.idServicio;
        this.horaI = listar.horaI;
        this.horaF = listar.horaF;
        this.horasT = listar.horasT;
        this.fechaI = listar.fechaI;
        this.fechaF = listar.fechaF;
        this.semana = listar.semana;

    }

}