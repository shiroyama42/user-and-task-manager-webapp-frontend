import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userId = sessionStorage.getItem("id")
  user: any = null

  constructor(private backendService: BackendService, private router: Router){}

  ngOnInit() : void{
    this.loadUser()
  }

  loadUser() : void{
    this.backendService.getUserById(this.userId).subscribe(
      data => {
        this.user = data
      }, error => {
        console.error('Error fecthing user: ', error)
      }
    )
  }

  editUser(user: any): void {
    if(this.user){
      this.user.isEdit = true;
    }
  }

  saveUser(user: any): void {
    if(this.user){
      this.backendService.updateUser(this.user.id, this.user).subscribe(
        (updatedUser) => {
          this.user = updatedUser;
          this.user.isEdit = false;
          console.log("User updated successfully.")
          window.location.reload();
        }, (error) => {
          console.error("Failed to update user: ", error);
        }
      )
    }
  }

}
