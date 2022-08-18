import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaInternaService } from 'app/core/service/firma-interna.service';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.scss']
})
export class DocumentosFirmarComponent implements OnInit {

  showAlert: boolean = false;
  listadoArchivos: any = [];
  listaBreve: any = [1 , 2, 3]
  datoTel: any;

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private firmainterna: FirmaInternaService
  ) { }

  ngOnInit() {
    let data = {
      "unidadNegocio": parseInt(this.uni),
      "tipoDoc":1,
      "numeroSolicitud":parseInt(this.soli)
    }
    this.firmainterna.documentosFirmar(data).subscribe(resp => {
      if (resp.status == 200) {
        console.log(resp.data)
        console.log(resp.data[0].informacion_archivo.nombreArchivo)
        this.listadoArchivos = resp.data
      }else{
        this.listadoArchivos = [];
      }
    })
  }

  descargar(item, base64) {
    const archivo = base64.split(',');
    const extension = 'pdf'
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = item.nombreArchivo
    link.click();
  }

  seguir() {
    let data = {
      "numeroSolicitud": this.soli,
      "tipo":"S"
    }

    this.firmainterna.solicitarGenerar(data).subscribe(resp => {
      if (resp.status == 200) {
        const telefono = JSON.stringify(resp.data.value);
        localStorage.setItem('telefono', telefono);
        this.router.navigate(['documentLogin' + '/' + this.soli + '/' + this.uni + '/' + 'otp-firma']);
      }
    })
    
  }

}
