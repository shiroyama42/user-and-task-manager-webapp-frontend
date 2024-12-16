import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-by-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-by-user.component.html',
  styleUrl: './task-by-user.component.css'
})
export class TaskByUserComponent {

  userId: number = 0;
  tasks: any[] = [];

  constructor(private backendService: BackendService, private route: ActivatedRoute){}

  ngOnInit() : void{
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId') || '', 10)
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('userId')
        this.userId = id !== null ? Number(id) : 0
        this.loadTaskByUser()
      }
    )
  }

  loadTaskByUser(): void{
    this.backendService.getTasksByUser(this.userId).subscribe(
      (data) => {
        this.tasks = data
      }, (error) => {
        console.error('Error fetching tasks: ', error)
      }
    )
  }

}
