import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioNew } from 'src/app/models/ServicioNew';
import { Servicio } from 'src/app/models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


/* getDias(fechaI:string,fechaF:string){
  return this.http.get('http://localhost:8080/calcularDias?fechaI=' + fechaI + '&fechaF=' + fechaF).pipe(map((response) => response));
} */

/*   getCalcularH(horaI: number, horaF: number) {
    return this.http.get('http://localhost:8080/calcularHoras?horaI=' + horaI + '&horaF=' + horaF).pipe(map((response) => response));
  } */

  getCalcularH(horaI: number, horaF: number, fechaI:string, fechaF:string) {
    return this.http.get('http://localhost:8080/calcularHoras?horaI=' + horaI + '&horaF=' + horaF +'&fechaI=' +fechaI +'&fechaF='+fechaF ).pipe(map((response) => response));
  }

  getSemanai() {
    return this.http.get('http://localhost:8080/verSemana').pipe(map((response) => response));
  }

  getSemanaf(fechaF:String) {
    return this.http.get('http://localhost:8080/calcularSem?fecha=' + fechaF).pipe(map((response) => response));
  }



  saveReporte(servicioNew: ServicioNew): Observable<any> {

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(servicioNew);

    return this.http.post('http://localhost:8080/registrar', body, { 'headers': headers });

  }

  
  getEmpleado(idEmpleado:number,semana:number) {

    return this.http.get<Servicio[]>('http://localhost:8080/consultar?idEmpleado=' + idEmpleado +'&semana=' + semana);

  }


}