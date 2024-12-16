import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TaskByUserComponent } from './task-by-user/task-by-user.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent},
    { path: 'users/:userId/tasks', component: TaskByUserComponent}
];
