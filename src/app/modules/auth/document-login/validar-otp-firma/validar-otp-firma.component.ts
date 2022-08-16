import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-otp-firma',
  templateUrl: './validar-otp-firma.component.html',
  styleUrls: ['./validar-otp-firma.component.scss']
})
export class ValidarOtpFirmaComponent implements OnInit {

  seconds: number = 10;
  showAlert: boolean = false;
  intervalo: any;

  constructor() { }

  ngOnInit() {

    this.intervalo = setInterval(() => {
      this.seconds = this.seconds - 1;
      if(this.seconds == 0){
        clearInterval(this.intervalo);
        console.log('Hola')
      }
    }, 1000);
    
  }
  
}
