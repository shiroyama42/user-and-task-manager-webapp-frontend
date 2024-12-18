import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'user-and-task-manager-webapp-frontend';

  userRole: string | null = null;
  userId: string | null = null;

  constructor(private router: Router){};

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
  }

  onLogOut(){
    sessionStorage.clear();
    window.location.reload();
  }

  handleOrdersClick(): void{
    this.userId = sessionStorage.getItem('id');
    if(!this.userId){
      console.error("Invalid user ID")
      return;
    }
    this.router.navigate([`/users/${this.userId}/order`]);
  }

  handleProfileClick(): void{
    this.userId = sessionStorage.getItem('id');
    if(!this.userId){
      console.error("Invalid user ID")
      return;
    }
    this.router.navigate([`/users/${this.userId}`]);
  }

  handleTasksClick() : void{
    this.userId = sessionStorage.getItem('id')
    if(!this.userId){
      console.error('Invalid user ID')
      return
    }
    this.router.navigate([`/users/${this.userId}/tasks`])
  }

}
