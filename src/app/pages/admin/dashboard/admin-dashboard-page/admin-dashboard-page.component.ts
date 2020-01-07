import { AppUser } from './../../../../server-connection/models/app-user';
import { AdminService } from './../../../../server-connection/services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})
export class AdminDashboardPageComponent implements OnInit {

  ELEMENT_DATA: AppUser[] = [];
  displayedColumns: string[] = ['userName', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<AppUser>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.adminService.getAllEmployees()
      .subscribe(
        (employees: Array<AppUser>) => {
          this.ELEMENT_DATA = employees;
          this.dataSource = new MatTableDataSource<AppUser>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        },
        (error) => console.log(error)
      );
  }

  deleteEmployee(element: AppUser) {
    this.adminService.deleteEmployee(element.id)
    .subscribe(
      () => {
        this.fetchEmployees();
      },
      (error) => console.log(error)
    )
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchEmployees();
    });
  }

}

@Component({
  selector: 'add-employee-dialog',
  templateUrl: 'add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialog {

  addEmployeeForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddEmployeeDialog>
  ) { }

  onSubmitAddEmployeeForm() {
    this.adminService.addEmployee({
      email: this.addEmployeeForm.value.email,
      phoneNumber: this.addEmployeeForm.value.phoneNumber,
      password: this.addEmployeeForm.value.password,
      confirmPassword: this.addEmployeeForm.value.confirmPassword
    } as EmployeeForm)
      .subscribe(
        response => {
          console.log(response);
          this.dialogRef.close();
        },
        error => console.log(error)
      );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}