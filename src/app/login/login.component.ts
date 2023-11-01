import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;
  token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  async handleLogin() {
    if (!this.myForm.valid) {
      alert('Please provide all required fields');
      return;
    }
    const { username, password } = this.myForm.value;

    const loginOutput = await this.authService.loginUser(username, password);

    if (!loginOutput) return;

    localStorage.setItem('auth-token', loginOutput.token.accessToken);
    localStorage.setItem('user-id', loginOutput.userId);
    this.router.navigate(['/chat']);
  }
}
