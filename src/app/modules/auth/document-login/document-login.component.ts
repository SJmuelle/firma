import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-document-login',
  templateUrl: './document-login.component.html',
  styleUrls: ['./document-login.component.scss']
})
export class DocumentLoginComponent implements OnInit {
  @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  comingSoonForm: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _authService: AuthService,
      private _formBuilder: FormBuilder
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Create the form
      this.comingSoonForm = this._formBuilder.group({
        documento: ['', [Validators.required]]
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  register(): void
  {
      // Return if the form is invalid
      if ( this.comingSoonForm.invalid )
      {
          return;
      }

      // Disable the form
      this.comingSoonForm.disable();

      // Hide the alert
      this.showAlert = false;

      // Do your action here...
      // Emulate server delay
      setTimeout(() => {

          // Re-enable the form
          this.comingSoonForm.enable();

          // Reset the form
          this.comingSoonNgForm.resetForm();

          // Set the alert
          this.alert = {
              type   : 'success',
              message: 'You have been registered to the list.'
          };

      }, 1000);
  }

}
