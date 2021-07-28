import { Component, OnInit } from '@angular/core';
import { ServicioNew } from '../models/ServicioNew';
import { UserService } from '../shared/services/user.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public showCalcular = true;
  public showEnviar = false;

  today = new Date();
  jstoday = '';


  horasT: any;

  semanaI: any;
  semanaF: any;
  semanaT: any;

  createFormGroup() {

    return new FormGroup({

      idEmpleado: new FormControl('', Validators.required),
      idServicio: new FormControl('', Validators.required),
      horaI: new FormControl('', Validators.required),
      horaF: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),

    });

  }
  calcularForm: FormGroup

  constructor(private service: UserService) {
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd ', 'en-CO', 'UTC -05:00');
    this.calcularForm = this.createFormGroup();

  }

  ngOnInit() {
    console.log(this.jstoday);
  }

  public idEmpleado = new FormControl(['', Validators.required]);
  public idServicio = new FormControl(['', Validators.required]);
  public horaI = new FormControl(['', Validators.required]);
  public horaF = new FormControl(['', Validators.required]);
  public fecha = new FormControl(['', Validators.required]);

  public newForm = new FormGroup({
    idEmpleado: this.idEmpleado,
    idServicio: this.idServicio,
    horaI: this.horaI,
    horaF: this.horaF,
    fecha: this.fecha,

  });

  horasTrabajadas() {

    timer(1000)

    this.showEnviar = true;
    this.showCalcular = false;

    let horaI = this.calcularForm.value.horaI;
    let horaF = this.calcularForm.value.horaF;
    let fechaI = this.jstoday;
    let fechaF =this.calcularForm.value.fecha;

    this.service.getCalcularH(horaI, horaF,fechaI,fechaF).subscribe(data =>
      this.horasT = data);

  }

  verSemanaI() {
    timer(1000)

    this.service.getSemanai().subscribe(data =>
      this.semanaI = data);
  }

  verSemanaF() {
   
    timer(1000)

    let fechaF = this.calcularForm.value.fecha;

    this.service.getSemanaf(fechaF).subscribe(data =>
      this.semanaF = data);
  }

  calcular() {

    if (this.calcularForm.valid ) {
    timer(1000)
      this.horasTrabajadas();
      timer(1000)
      this.verSemanaI();
      timer(1000)
      this.verSemanaF();
      timer(1000)

    } else {
      
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios!",

      })
    
      this.showEnviar = false;
      this.showCalcular = true;
    }
  }

  enviar() {

    if (this.calcularForm.valid &&  this.semanaI == this.semanaF && this.horasT>=1 ) {

      this.semanaT = this.semanaI
      this.registrar();
     

    } else if (this.calcularForm.valid && this.semanaI < this.semanaF && this.horasT>=1) {
    
      
      this.registrar()
      timer(1000)

      this.registrar2();

    } else if(this.calcularForm.valid && this.semanaI > this.semanaF || this.horasT<1) {
      
      Swal.fire({
        icon: 'error',
        title: 'la fecha no es valida !',

      })
      window.location.reload(); 

    }
  }

  registrar2(){
 
    if (this.calcularForm.valid) {


      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.jstoday;
      let fechaF = this.calcularForm.value.fecha;
      let horasT = this.horasT/2;
      let semana = this.semanaF;

      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasT, fechaI, fechaF, semana)
      console.log(servicioNew)

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid!',

      })

      );
    window.location.reload(); 

    }else{
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios!",

      })
    }


  }

  registrar() {
  
    if (this.calcularForm.valid && this.semanaI==this.semanaF) {

      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.jstoday;
      let fechaF = this.calcularForm.value.fecha;
      let horasT = this.horasT;
      let semana = this.semanaI;

      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasT, fechaI, fechaF, semana)
      console.log(servicioNew)

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 5500,
        });

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid!',

      })

      );
    window.location.reload(); 

    }else if(this.calcularForm.valid && this.semanaI<this.semanaF) {


      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.jstoday;
      let fechaF = this.calcularForm.value.fecha;
      let horasT = this.horasT/2;
      let semana = this.semanaI;

      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasT, fechaI, fechaF, semana)
      console.log(servicioNew)

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 5500,
        });

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid!',

      })

      );
    window.location.reload(); 


    }else{
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios!",

      })
    }

  }

}
