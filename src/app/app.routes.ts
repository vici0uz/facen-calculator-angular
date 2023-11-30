import { Routes } from '@angular/router';
import { CalcComponent } from './calc/calc.component';
import { CalcmodeComponent } from './calcmode/calcmode.component';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: "full" },
    { path: "home", component: CalcmodeComponent },
    { path: "calc", component: CalcComponent}
];
