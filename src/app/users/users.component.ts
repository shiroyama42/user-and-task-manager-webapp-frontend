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

  newUser = {id: 0, name: '', email: '', phone: '', }

  confirmDelete: number | null = null

  roles: any[] = []
  departments: any[] = []

  isAdmin: boolean = false;

  constructor(private backendService: BackendService, private router: Router){}

  ngOnInit() : void{
    this.loadUsers();
    this.loadRoles();
    this.loadDepartments();
    if(sessionStorage.getItem('role') == 'Admin'){
      this.isAdmin = true;
    }
  }

  loadUsers() : void{
    this.backendService.getUsers().subscribe(
      (data) => {
        this.users = data
        this.filteredUsers = [...this.users]
      },
      (error) => {
        console.error('Error fetching users:', error)
      }
    );
  }

  loadRoles() : void{
    this.backendService.getRoles().subscribe(
      (data) => {
        this.roles = data
      }, (error) => {
        console.error('Error fetching roles: ', error)
      }
    )
  }

  loadDepartments() : void{
    this.backendService.getDepartments().subscribe(
      (data) => {
        this.departments = data
      }, (error) => {
        console.error('Error fetching departments: ', error)
      }
    )
  }

  promptDelete(userId: number) : void{
    this.confirmDelete = userId
  }

  cancelDelete() : void{
    this.confirmDelete = null
  }

  deleteUser(userId: number) : void{
    if(!userId){
      console.error('Invalid ID')
      return;
    }
    this.backendService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id != userId)
        this.filteredUsers = this.filteredUsers.filter((user) => user.id != userId)
        console.log(`User  with ID  ${userId} deleted successfully.`)
        this.confirmDelete = null
      }, (error) => {
        console.error('Error deleting user: ', error)
      }
    )
  }

  editUser(user: any) : void{
    this.users.forEach(u => u.isEdit = false)
    user.isEdit = true;
  }

  saveUser(user: any) : void{
    this.backendService.updateUser(user.id, user).subscribe(
      (updatedUser) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser; 
        }

        const indexInFiltered = this.filteredUsers.findIndex(u => u.id === updatedUser.id);
        if (indexInFiltered !== -1) {
          this.filteredUsers[indexInFiltered] = updatedUser;
        }

        user.isEdit = false; 
        console.log('User updated successfully:', updatedUser);
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
      }
    );
  }

  cancelEdit(): void {
    this.loadUsers(); 
    this.users.forEach(u => u.isEdit = false); 
    this.filteredUsers = [...this.users];
  }

  handleTasksClick(userId: number) : void{
    if(!userId){
      console.error('Invalid user ID')
      return
    }
    this.router.navigate([`/users/${userId}/tasks`])
  }

  
}
