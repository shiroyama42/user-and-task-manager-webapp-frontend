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

  saveUser(user: any) : Observable<any>{
    return this.http.post<any>(this.usersUrl, user)
  }



}
