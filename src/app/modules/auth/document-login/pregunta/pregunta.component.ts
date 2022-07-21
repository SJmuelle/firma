import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {
  preguntas: any[];
  vistaPregunta=0;
  constructor() { }

  ngOnInit(): void {
    let data=[];
   data.push(
      {
        "id": "50107573",
        "resultado": "01",
        "registro": "4564020",
        "excluirCliente": "false",
        "alertas": "false",
        "respuestaAlerta": "03",
        "codigoAlerta": "00",
        "Pregunta": [
          {
            "id": "005003002",
            "texto": "CON CUAL DE LAS SIGUIENTES ENTIDADES ADQUIRIO UNA TARJETA DE CREDITO  MASTER CARD DURANTE LOS ULTIMOS 6 MESES?",
            "orden": "1",
            "idRespuestaCorrecta": "00",
            "peso": "2",
            "Respuesta": [
              {
                "id": "001",
                "texto": "CONFIAR COOPERATIVA FINANCIERA"
              },
              {
                "id": "002",
                "texto": "FINANCIERA JURISCOOP SA COMPAÑIA DE FINANCIAMIENTO"
              },
              {
                "id": "003",
                "texto": "BANCO AGRARIO DE COLOMBIA S.A."
              },
              {
                "id": "004",
                "texto": "CREDIVALORES - CREDISERVICIOS S.A.S"
              },
              {
                "id": "005",
                "texto": "BANCO PICHINCHA S.A"
              },
              {
                "id": "006",
                "texto": "NINGUNA DE LAS ANTERIORES"
              }
            ]
          },
          {
            "id": "005015502",
            "texto": "CON CUAL DE LAS SIGUIENTES ENTIDADES SU CREDITO HIPOTECARIO CUENTA CON SUBSIDIO?",
            "orden": "2",
            "idRespuestaCorrecta": "00",
            "peso": "2",
            "Respuesta": [
              {
                "id": "001",
                "texto": "BANCO COLPATRIA MULTIBANCA COLPATRIA S.A."
              },
              {
                "id": "002",
                "texto": "BANCO COMPARTIR S.A"
              },
              {
                "id": "003",
                "texto": "CONFIAR COOPERATIVA FINANCIERA"
              },
              {
                "id": "004",
                "texto": "BANCO POPULAR S. A."
              },
              {
                "id": "005",
                "texto": "BANCO DAVIVIENDA S.A."
              },
              {
                "id": "006",
                "texto": "NINGUNA DE LAS ANTERIORES"
              }
            ]
          },
          {
            "id": "001004001",
            "texto": "LA CIUDAD DE EXPEDICION DE SU CEDULA ES?:",
            "orden": "3",
            "idRespuestaCorrecta": "00",
            "peso": "1",
            "Respuesta": [
              {
                "id": "001",
                "texto": "ARMENIA"
              },
              {
                "id": "002",
                "texto": "GENOVA"
              },
              {
                "id": "003",
                "texto": "BUENAVISTA"
              },
              {
                "id": "004",
                "texto": "LA SIERRA"
              },
              {
                "id": "005",
                "texto": "POPAYAN"
              },
              {
                "id": "006",
                "texto": "NINGUNA DE LAS ANTERIORES"
              }
            ]
          },
          {
            "id": "005007002",
            "texto": "HACE CUANTO TIEMPO TIENE SU CREDITO HIPOTECARIO CON BANCO AV VILLAS S.A.?",
            "orden": "4",
            "idRespuestaCorrecta": "00",
            "peso": "1",
            "Respuesta": [
              {
                "id": "001",
                "texto": "ENTRE 0 Y 2 AÑOS"
              },
              {
                "id": "002",
                "texto": "ENTRE 3 Y 4 AÑOS"
              },
              {
                "id": "003",
                "texto": "ENTRE 5 Y 8 AÑOS"
              },
              {
                "id": "004",
                "texto": "ENTRE 9 Y 14 AÑOS"
              },
              {
                "id": "005",
                "texto": "15 AÑOS O MAS"
              },
              {
                "id": "006",
                "texto": "NO TENGO CREDITO DE VIVIENDA CON LA ENTIDAD"
              }
            ]
          }
        ]
      }
    )

    this.preguntas=data[0].Pregunta
  }

}
