import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TaskByUserComponent } from './task-by-user/task-by-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentsComponent } from './departments/departments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full'},
    { path: 'users', component: UsersComponent},
    { path: 'users/:userId', component: ProfileComponent},
    { path: 'users/:userId/tasks', component: TaskByUserComponent},
    { path: 'auth/registration', component: RegisterComponent},
    { path: 'auth/login', component: LoginComponent},
    { path: 'tasks', component: TasksComponent},
    { path: 'departments', component: DepartmentsComponent}
];
