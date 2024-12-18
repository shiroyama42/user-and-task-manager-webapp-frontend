import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common'; // Import DatePipe for date formatting

interface User {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  task: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  completionTime: Date;
  users: User[];
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [DatePipe]  // Add DatePipe provider
})
export class TasksComponent {

  tasks: any[] = []
  filteredTasks: any[] = []

  users: any[] = []
  
  confirmDelete: number | null = null
  currentDate = new Date()

  newTask = {id: 0, task: '', startDate: this.currentDate, endDate: new Date()}
  isAddingTask: boolean = false
  isAdmin: boolean = false

  constructor(private backendService: BackendService, private datePipe: DatePipe) {}

  ngOnInit() : void {
    this.loadTasks()
    this.loadUsers()
    if(sessionStorage.getItem('role') == 'Admin'){
      this.isAdmin = true;
    }
  }

  loadTasks() : void {
    this.backendService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data.map(task => ({
          ...task,
          users: task.users || [],
          startDate: this.formatDate(task.startDate),  
          endDate: this.formatDate(task.endDate),  
          completionTime: task.completionTime ? this.formatDate(task.completionTime) : null,  
        }));
        this.filteredTasks = [...this.tasks];
      },
      error => console.error('Failed to load tasks', error)
    )
  }

  loadUsers(): void {
    this.backendService.getUsers().subscribe(
      data => {
        this.users = data
      }, error => {
        console.error('Error fetching users: ', error)
      }
    )
  }

  formatDate(date: Date | null): string | null {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null; 
  }

  promptDelete(userId: number) : void {
    this.confirmDelete = userId
  }

  cancelDelete() : void {
    this.confirmDelete = null
  }

  deleteTask(taskId: number) : void {
    if(!taskId) {
      console.error('Invalid ID');
      return;
    }
    this.backendService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.filteredTasks = this.filteredTasks.filter((task) => task.id !== taskId);
        console.log(`Task with ID ${taskId} deleted successfully.`);
        this.confirmDelete = null;
      }, (error) => {
        console.error('Error deleting task: ', error);
      }
    )
  }

  assignTaskToUser(userId: number, taskId: number) : void {
    console.log('Assigning task:', taskId, 'to user:', userId);
    const userTask = {"userId": userId, "taskId": taskId}
    this.backendService.assignTasksToUsers(userTask).subscribe(
      () => {
        console.log(`Task with ID ${taskId} assigned successfully to user ${userId}`);
        this.loadTasks()
      }
    )
  }

  deleteTaskFromUser(userId: number, taskId: number) : void {
    this.backendService.deleteTaskFromUser(userId, taskId).subscribe(
      () => {
        console.log(`Task with ID ${taskId} successfully removed from user with ID ${userId}`);
        this.loadTasks()
      }
    )
  }

  editTask(task: any) : void {
    this.tasks.forEach(u => u.isEdit = false)
    task.isEdit = true;
  }

  saveTask(task: any) : void {
    if(task.completed) {
      task.completionTime = new Date().toISOString();
    }

    task.startDate = new Date(task.startDate);
    task.endDate = new Date(task.endDate);

    this.backendService.updateTask(task.id, task).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex(u => u.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }

        const indexInFiltered = this.filteredTasks.findIndex(u => u.id === updatedTask.id);
        if (indexInFiltered !== -1) {
          this.filteredTasks[indexInFiltered] = updatedTask;
        }

        task.isEdit = false; 
        console.log('Task updated successfully:', updatedTask);
        this.loadTasks();
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  cancelEdit(): void {
    this.loadTasks(); 
    this.tasks.forEach(u => u.isEdit = false); 
    this.filteredTasks = [...this.users];
  }

  toggleCompletion(task: any): void {
    this.backendService.updateTask(task.id, task).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex(u => u.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.tasks[index].completed = !this.tasks[index].completed;
        }
  
        const indexInFiltered = this.filteredTasks.findIndex(u => u.id === updatedTask.id);
        if (indexInFiltered !== -1) {
          this.filteredTasks[indexInFiltered] = updatedTask;
          this.tasks[index].completed = !this.tasks[index].completed;
        }
        this.loadTasks()
        console.log(updatedTask)
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  openAddTaskForm(): void {
    this.isAddingTask = true;
  }

  cancelAddTask(): void {
    this.isAddingTask = false;
    this.newTask = { id: 0, task: '', startDate: this.currentDate, endDate: new Date() };
  }

  addTask(): void {
    if (!this.newTask.task || !this.newTask.startDate || !this.newTask.endDate) {
      console.error('Missing required fields');
      return;
    }
    
    this.newTask.startDate = new Date(this.newTask.startDate);
    this.newTask.endDate = new Date(this.newTask.endDate);

    this.backendService.addTask(this.newTask).subscribe(
      (createdTask) => {
        console.log('New task added successfully:', createdTask);
        this.loadTasks(); 
        this.cancelAddTask(); 
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
  }
}
