import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private token = sessionStorage.getItem("token");
  private usersUrl = 'company/users'
  private tasksUrl = 'company/tasks'
  private departmentsUrl = 'company/departments'
  private rolesUrl = 'company/roles'

  constructor(private http: HttpClient) { }

  //USERS
  getUsers() : Observable<any>{
    return this.http.get<any>(this.usersUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

  getUserById(userId: number | null) : Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  addUser(user: any) : Observable<any>{
    return this.http.post<any>(this.usersUrl, user,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  updateUser(userId: number | null, updatedUser: any) : Observable<any>{
    return this.http.put<any>(`${this.usersUrl}/${userId}`, updatedUser,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  deleteUser(userId: number | null) : Observable<any>{
    return this.http.delete<any>(`${this.usersUrl}/${userId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }


  //ROLES
  getRoles() : Observable<any>{
    return this.http.get<any>(this.rolesUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }



  //DEPARTMENTS
  getDepartments() : Observable<any>{
    return this.http.get<any>(this.departmentsUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }


  //TASKS
  getTasks() : Observable<any>{
    return this.http.get<any>(this.tasksUrl,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

  addTask(task: any) : Observable<any>{
    return this.http.post<any>(this.usersUrl, task,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  updateTask(taskId: number | null, updatedTask: any) : Observable<any>{
    return this.http.put<any>(`${this.tasksUrl}/${taskId}`, updatedTask,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  deleteTask(taskId: number | null) : Observable<any>{
    return this.http.delete<any>(`${this.tasksUrl}/${taskId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  getTasksByUser(userId: number | null) : Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/${userId}/tasks`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

}
