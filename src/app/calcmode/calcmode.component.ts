import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-calcmode',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './calcmode.component.html',
  styleUrl: './calcmode.component.scss'
})
export class CalcmodeComponent {
  constructor( private router: Router) {}
  go(destination: string) {
    if (destination === 'pres'){
      this.router.navigate(['/calc']);
    }
}
}
