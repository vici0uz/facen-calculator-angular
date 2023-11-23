import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormControl, ReactiveFormsModule, FormsModule, NgForm, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { Nota } from './nota';
import { Puntaje } from './data';
import { checkVals } from './validatorxd';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, InputTextModule, ButtonModule, InputSwitchModule, FormsModule, TableModule, ReactiveFormsModule, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  title = '🐊 Calculadora de notas ❤️';
  pForm:FormGroup = new FormGroup({}); 
 

  total = 0
  tiene_firma = false
  no_firmas = 0
  acumulado = 0
  sumatoria = 0
  puntaje_examen = new FormControl()
  tiene_tp: boolean = false
  tiene_participacion: boolean = false

  puntaje: Puntaje = {}

  notas = [
    { nota: 2, divisor: 60 },
    { nota: 3, divisor: 70 },
    { nota: 4, divisor: 80 },
    { nota: 5, divisor: 90 }
  ];

  tabla: Nota[] = []
  checkVals() {
    let total = (
      Number(this.pForm.value.peso_examenes ? this.pForm.value.peso_examenes : 0) +
      Number(this.pForm.value.peso_participacion ? this.pForm.value.peso_participacion : 0) +
      Number(this.pForm.value.peso_tp ? this.pForm.value.peso_tp : 0)
    )
    if (total <= 40) {
      this.sumatoria = total
      return true
    }
    return false
  }

  checkPesos(control: AbstractControl): ValidationErrors | null {
    const peso_examenes =control.get("peso_examenes")?.value
    console.log(peso_examenes)
    const peso_participacion = control.get("peso_participacion")?.value
    console.log(peso_participacion)
    const peso_tp = control.get("peso_tp")?.value
    const total = (
      Number(peso_examenes ? peso_examenes : 0) +
      Number(peso_participacion ? peso_participacion : 0) +
      Number(peso_tp ? peso_tp : 0)
    )
    if (total > 40) {
      return {'over40': true}
    }
    console.log('total')
    console.log(total)
    return null
  }

  checkPuntajes(control: AbstractControl): ValidationErrors | null {
    console.log(control)
    if(control.value>100){
      return {'plus100':true}
    }
    return null
  }

  rowMaker() {
    this.tabla.length = 0;
    this.notas.forEach((el, index) => {
      const row: Nota = {
        nota: el.nota,
        puntaje: Math.round((el.divisor * 100) / 60 - (this.acumulado * 40) / 60)
      };
      this.tabla.push(row);
    })
  }
  xd(obj: any){
    console.log(obj?.['over40']);
  }
  calculo() {
    this.checkVals()
    this.tiene_firma = false
    this.no_firmas = 0
    if (this.pForm.value.peso_examenes != 0 && this.pForm.value.peso_examenes <= 40) {
      this.sumatoria = (this.pForm.value.peso_examenes? this.pForm.value.peso_examenes : 0)
      this.sumatoria+= (((this.sumatoria <40) && this.pForm.value.tiene_tp && this.pForm.value.peso_tp <=40)?this.pForm.value.peso_tp:0)
      this.sumatoria+= (((this.sumatoria <40) && this.pForm.value.tiene_participacion && this.pForm.value.peso_participacion <=40)?this.pForm.value.peso_participacion:0)

      if (this.pForm.value.parcial1 != 0 && this.pForm.value.parcial1 <= 100) {
        this.acumulado = (
          (Number(this.pForm.value.parcial1) +
            Number((this.pForm.value.parcial2 != 0 &&
              this.pForm.value.parcial2 <= 100) ? Number(this.pForm.value.parcial2) : 0)
          ) / 2) * (this.pForm.value.peso_examenes / 40)
        // CALCULO CON TRABAJO PRACTICO
        if (this.pForm.value.tiene_tp) {
          if (this.pForm.value.puntaje_tp && this.pForm.value.puntaje_tp <= 100) {
            this.acumulado += (Number(this.pForm.value.puntaje_tp) * this.pForm.value.peso_tp) / 40
          }
        }
        // CALCULO CON PARTICIPACION
        if (this.pForm.value.tiene_participacion) {
          if (this.pForm.value.puntaje_participacion && this.pForm.value.puntaje_participacion <= 100) {
            this.acumulado += (Number(this.pForm.value.puntaje_participacion) * this.pForm.value.peso_participacion) / 40
          }
        }
        this.acumulado = Math.round(this.acumulado * 100) / 100
        if (this.acumulado >= 50) {
          this.rowMaker()
          this.tiene_firma = true
          this.no_firmas = 1
          if (this.acumulado >= 60) {
            this.no_firmas = 2
          }
        }
        else {
          this.tiene_firma = false
        }
      }
    }
  }

  reset(){
    this.pForm.reset()
    this.acumulado = this.sumatoria = 0;
  }

  ngOnInit(): void {
    this.pForm = new FormGroup({
      peso_examenes: new FormControl('', [Validators.maxLength(2)]),
      parcial1: new FormControl('',[Validators.required, this.checkPuntajes]),
      parcial2: new FormControl('',[Validators.maxLength(3),this.checkPuntajes]),
      tiene_tp: new FormControl(),
      peso_tp: new FormControl('', [Validators.maxLength(2)]),
      puntaje_tp: new FormControl('', [Validators.maxLength(3),this.checkPuntajes]),
      tiene_participacion: new FormControl(),
      peso_participacion: new FormControl('', [Validators.maxLength(2)]),
      puntaje_participacion: new FormControl('',[Validators.maxLength(3), this.checkPuntajes])
    }, {validators: [this.checkPesos]});


  }


}


