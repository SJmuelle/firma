import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {
  mensaje: string;

  constructor(   private router: Router) { }

  ngOnInit(): void {
    this.mensaje=localStorage.getItem('ERROR')
  }

  seguir() {
      this.router.navigate(['documentLogin']);
  }

}
