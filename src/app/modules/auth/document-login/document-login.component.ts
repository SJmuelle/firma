import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/service/auth.service';
import { DocumentLoginService } from 'app/core/service/document-login.service';
import { GuardianService } from 'app/core/service/guardian.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-login',
  templateUrl: './document-login.component.html',
  styleUrls: ['./document-login.component.scss']
})
export class DocumentLoginComponent implements OnInit {
  @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  comingSoonForm: FormGroup;
  showAlert: boolean = false;
  infoApp = environment;

  acceso:boolean = true;

  soli: string = this.activeroute.snapshot.paramMap.get('num')
  uni: string = this.activeroute.snapshot.paramMap.get('uni')

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private guardia: GuardianService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private activeroute: ActivatedRoute,
    private _documentLoginService: DocumentLoginService
  ) {
    this.loguear();

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    localStorage.setItem('solicitud', this.soli);
    localStorage.setItem('unidad', this.uni);
    // Create the form
    this.comingSoonForm = this._formBuilder.group({
      documento: ['', [Validators.required, Validators.minLength(5), this.numberValid]]
    });
  }

  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
      return { notNumber: true };
    }
    return null;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  concederAcceso(){
    this.guardia.conceder.next({acceso: this.acceso})
  }
  /**
   * Sign in
   */
  register(): void {
    // Return if the form is invalid
    if (this.comingSoonForm.invalid) {
      return;
    }

    // Disable the form
    this.comingSoonForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Do your action here...
    // Emulate server delay
    setTimeout(() => {
      this.datosUsuario();
      // Re-enable the form
      this.comingSoonForm.enable();

      // Reset the form
      this.comingSoonNgForm.resetForm();

      // Set the alert
      this.alert = {
        type: 'success',
        message: 'You have been registered to the list.'
      };

    }, 1000);
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private loguear(): void {
    this._authService.postSession(this.infoApp.userName, this.infoApp.password).subscribe();
  }



  public datosUsuario(): void {
    let doc = this.comingSoonForm.value.documento;
    let unidadNegocio = this.uni;
    this._documentLoginService.datosUsuario(this.comingSoonForm.value.documento,unidadNegocio).subscribe(resp => {
      if (resp.data!=null) {
        localStorage.setItem('datosUsuario', JSON.stringify(resp.data));
        this.concederAcceso();
        this.router.navigate(['documentLogin'+ '/' + this.soli + '/' + this.uni + '/user/' + doc]);
      } else {
        Swal.fire(
          'Aviso',
          'Este documento no existe',
          'info'
        )
      }
    })
  }
}
