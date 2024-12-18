import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments: any[] = [];
  isAddingDepartment: boolean = false;
  newDepartment = { depId: 0, depName: '' };

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.backendService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
      },
      (error) => console.error('Error loading departments:', error)
    );
  }

  openAddDepartmentForm(): void {
    this.isAddingDepartment = true;
  }

  cancelAddDepartment(): void {
    this.isAddingDepartment = false;
    this.newDepartment = { depId: 0, depName: '' };
  }

  addDepartment(): void {
    if (!this.newDepartment.depName) {
      console.error('Department name is required');
      return;
    }

    this.backendService.addDepartment(this.newDepartment).subscribe(
      (createdDepartment) => {
        console.log('New department added:', createdDepartment);
        this.loadDepartments();
        this.cancelAddDepartment();
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
  }

  editDepartment(department: any): void {
    this.departments.forEach((dep) => (dep.isEdit = false));
    department.isEdit = true;
  }

  saveDepartment(department: any): void {
    this.backendService.updateDepartment(department.depId, department).subscribe(
      (updatedDepartment) => {
        const index = this.departments.findIndex((dep) => dep.depId === updatedDepartment.depId);
        if (index !== -1) {
          this.departments[index] = updatedDepartment;
        }
        department.isEdit = false;
        console.log('Department updated:', updatedDepartment);
        this.loadDepartments();
      },
      (error) => console.error('Error updating department:', error)
    );
  }

  cancelEdit(): void {
    this.loadDepartments();
    this.departments.forEach((dep) => (dep.isEdit = false));
  }

  deleteDepartment(departmentId: number): void {
    this.backendService.deleteDepartment(departmentId).subscribe(
      () => {
        this.departments = this.departments.filter((dep) => dep.depId !== departmentId);
        console.log(`Department with ID ${departmentId} deleted successfully.`);
      },
      (error) => console.error('Error deleting department:', error)
    );
  }
}
