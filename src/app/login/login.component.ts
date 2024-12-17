import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: "",
    password: ""
  };

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router){};

  setToken(response: string): void{
    sessionStorage.setItem('token', response);

    const decodedToken: any = jwtDecode(response);
    const role = decodedToken.role;

    sessionStorage.setItem('role', role);
    console.log("Role: ", role);

    const id = decodedToken.id;
    sessionStorage.setItem('id', id);
    console.log("ID: ", id);
  }

  onLogin(){
    this.http.post('/auth/login', this.loginData, {responseType: 'text'}).subscribe(
      (response) => {
        console.log("Login successful: ", response);
        this.setToken(response);
        this.router.navigate(['/']);
      }, (error) => {
        console.error('Login failed: ', error);
        this.errorMessage = 'Invalid email or password';
      }
    )
  }
}
