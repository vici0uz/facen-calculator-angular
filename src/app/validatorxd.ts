import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkVals(val: any): ValidatorFn {
    console.log('value')
    console.log(val.value)
    return (control: AbstractControl): ValidationErrors | null => {
        const fields = {
            peso_examen: control.parent?.get('peso_examenes')?.value,
            peso_participacion: control.parent?.get('peso_participacion')?.value,
            peso_tp: control.parent?.get('peso_tp')?.value
        }
        const forbidden = ((fields.peso_examen <= 40) ? true: false)
        return forbidden ? { forbiddenValue: { value: control.value } } : null;
        // const forbidden = (((val.value <= 40) && (!Number.isNaN(val.value))) ? true : false)
        // return forbidden ? { forbiddenValue: { value: control.value } } : null;
    }
}