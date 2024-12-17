import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  task: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  completionTime: string;
  users: User[];
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks: any[] = []
  filteredTasks: any[] = []

  users: any[] = []
  
  currentDate = new Date()
  newTask = {id: 0, task: '', startDate: this.currentDate, endDate: ''}


  constructor(private backendService: BackendService){}

  ngOnInit() : void{
    this.loadTasks()
  }

  loadTasks() : void{
    this.backendService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data.map(task => ({
          ...task,
          assignedUsersName: task.users.map(user => `${user.name}`).join('; '),
          assignedUsersEmail: task.users.map(user => `${user.email}`).join('; ')
        }));
        this.filteredTasks = [...this.tasks];
      },
      error => console.error('Failed to load tasks', error)
    );
  }
}
