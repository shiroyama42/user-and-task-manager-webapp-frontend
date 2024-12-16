import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private usersUrl = 'company/users'
  private tasksUrl = 'company/tasks'
  private departmentsUrl = 'company/departments'
  private rolesUrl = 'company/roles'

  constructor(private http: HttpClient) { }

  //USERS
  getUsers() : Observable<any>{
    return this.http.get<any>(this.usersUrl)
  }

  getUserById(userId: number | null) : Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/${userId}`)
  }

  addUser(user: any) : Observable<any>{
    return this.http.post<any>(this.usersUrl, user)
  }

  updateUser(userId: number | null, updatedUser: any) : Observable<any>{
    return this.http.put<any>(`${this.usersUrl}/${userId}`, updatedUser)
  }

  deleteUser(userId: number | null) : Observable<any>{
    return this.http.delete<any>(`${this.usersUrl}/${userId}`)
  }


  //ROLES
  getRoles() : Observable<any>{
    return this.http.get<any>(this.rolesUrl)
  }



  //DEPARTMENTS
  getDepartments() : Observable<any>{
    return this.http.get<any>(this.departmentsUrl)
  }


  //TASKS
  getTasks() : Observable<any>{
    return this.http.get<any>(this.tasksUrl)
  }

  addTask(task: any) : Observable<any>{
    return this.http.post<any>(this.usersUrl, task)
  }

  updateTask(taskId: number | null, updatedTask: any) : Observable<any>{
    return this.http.put<any>(`${this.tasksUrl}/${taskId}`, updatedTask)
  }

  deleteTask(taskId: number | null) : Observable<any>{
    return this.http.delete<any>(`${this.tasksUrl}/${taskId}`)
  }

  getTasksByUser(userId: number | null) : Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/${userId}/tasks`)
  }

}
