export class ServicioNew {

    idEmpleado: number;
    idServicio: number;
    horaI: number;
    horaF: number;
    horasT: number;
    fechaF:String;
    fechaI:String;
    semana:number;

    constructor(idEmpleado: number, idServicio: number, horaI: number, horaF: number,  horasT: number , fechaI: String , fechaF: String , semana: number) {

        this.idEmpleado = idEmpleado;
        this.idServicio = idServicio;
        this.horaI = horaI;
        this.horaF = horaF;
        this.horasT = horasT;
        this.fechaI = fechaI;
        this.fechaF = fechaF;
        this.semana = semana;
        
    }



}