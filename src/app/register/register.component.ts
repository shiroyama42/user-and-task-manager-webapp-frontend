import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';

interface RegistrationData {
  name: string;
  emailAddress: string;
  password: string;
  birthDate: string;
  phone: string;
}
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Import CommonModule for NgIf
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  setToken(response : string): void {
    sessionStorage.setItem("token" , response);
  }

  onRegistration(): void {
      if (this.registrationForm.valid) {
        const registrationData: RegistrationData = this.registrationForm.value;

        this.http.post(`/auth/registration`, registrationData,
          {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json'},responseType: 'text' }
          ).subscribe(response => {
          this.setToken(response)
          //this.router.navigate(['/auth/login']);
        });
      }
  }
}
