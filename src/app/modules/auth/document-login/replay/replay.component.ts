import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {
  mensaje: string;
  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mensaje=localStorage.getItem('error')
  }

  seguir() {
    this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni]);
  }

}
