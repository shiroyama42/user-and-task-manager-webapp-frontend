import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TaskByUserComponent } from './task-by-user/task-by-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent},
    { path: 'users/:userId/tasks', component: TaskByUserComponent},
    { path: 'auth/registration', component: RegisterComponent},
    { path: 'auth/login', component: LoginComponent}
];
