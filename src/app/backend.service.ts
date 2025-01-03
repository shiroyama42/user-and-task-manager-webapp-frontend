import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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

  getUserById(userId: string | null) : Observable<any>{
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

  addDepartment(dep: any) : Observable<any>{
    return this.http.post<any>(this.departmentsUrl, dep,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

  updateDepartment(depId: number | null, updatedDep: any) : Observable<any>{
    return this.http.put<any>(`${this.departmentsUrl}/${depId}`, updatedDep,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  deleteDepartment(depId: number | null) : Observable<any>{
    return this.http.delete(`${this.departmentsUrl}/${depId}`,
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
    return this.http.post<any>(this.tasksUrl, task,
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

  assignTaskToUser(userId: number | null, taskId: number | null) : Observable<any>{
    console.log(this.token)
    return this.http.post<any>(`${this.usersUrl}/${userId}/tasks/${taskId}`, 
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

  deleteTaskFromUser(userId: number | null, taskId: number | null) : Observable<any>{
    return this.http.delete<any>(`${this.usersUrl}/${userId}/tasks/${taskId}`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

  getTasksByUser(userId: number | null) : Observable<any>{
    return this.http.get<any>(`${this.usersUrl}/${userId}/tasks`,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}

    )
  }

  //USER-TAK
  assignTasksToUsers(userTask: any) : Observable<any>{
    return this.http.post<any>('company/usertasks', userTask,
      {headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : this.token ? `Bearer ${this.token}` : '' }}
    )
  }

}