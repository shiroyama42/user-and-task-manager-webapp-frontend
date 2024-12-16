import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any[] = []
  filteredUsers: any[] = []

  constructor(private backendService: BackendService, private router: Router){}

  ngOnInit() : void{
    this.loadUsers();
  }

  loadUsers() : void{
    this.backendService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



}
