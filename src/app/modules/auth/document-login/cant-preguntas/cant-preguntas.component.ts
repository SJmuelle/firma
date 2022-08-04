import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cant-preguntas',
  templateUrl: './cant-preguntas.component.html',
  styleUrls: ['./cant-preguntas.component.scss']
})
export class CantPreguntasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const cantidadPreguntas = [
      {
          order   : 1,
          title   : 'Introduction',
          subtitle: 'Introducing the library and how it works',
          content : `<h2 class="text-2xl sm:text-3xl">Introduction</h1>`
      },
      {
          order   : 2,
          title   : 'Get the sample code',
          subtitle: 'Where to find the sample code and how to access it',
          content : `<h2 class="text-2xl sm:text-3xl">Get the sample code</h1>`
      },
      {
          order   : 3,
          title   : 'Create a Firebase project and Set up your app',
          subtitle: 'How to create a basic Firebase project and how to run it locally',
          content : `<h2 class="text-2xl sm:text-3xl">Create a Firebase project and Set up your app</h1>`
      },
      {
          order   : 4,
          title   : 'Install the Firebase Command Line Interface',
          subtitle: 'Setting up the Firebase CLI to access command line tools',
          content : `<h2 class="text-2xl sm:text-3xl">Install the Firebase Command Line Interface</h1>`
      }
  ];
  }

}
