import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  myForm: FormGroup;
  token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('auth-token')) this.router.navigate(['/chat']);
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async handleSignUp() {
    if (!this.myForm.valid) {
      alert(
        'Please make sure all the fields are filled and also passwords are min of 8 characters long'
      );
      return;
    }

    const { password, confirm, username, name } = this.myForm.value;

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.signupUser(name, username, password);
  }
}
