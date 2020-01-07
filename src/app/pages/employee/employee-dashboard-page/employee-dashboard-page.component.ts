import { ContractService } from './../../../server-connection/services/contract.service';
import { ContractGadget } from './../../../server-connection/models/contract-gadget';
import { Status, Contract } from './../../../server-connection/models/contract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from './../../../server-connection/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';

export interface StatusCustom {
  value: number;
  viewValue: string;
}

const isValidDate = (date: string) => {
  return moment(date).isAfter('1950-01-01', 'years') && moment(date).isBefore('2100-01-01', 'years');
}

@Component({
  selector: 'app-employee-dashboard-page',
  templateUrl: './employee-dashboard-page.component.html',
  styleUrls: ['./employee-dashboard-page.component.css']
})
export class EmployeeDashboardPageComponent implements OnInit {
  
  ELEMENT_DATA: ContractGadget[] = [];
  displayedColumns: string[] = ['customerName', 'gadgetName', 'startDate', 'endDate', 'status', 'observations', 'actions'];
  dataSource = new MatTableDataSource<ContractGadget>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.fetchContractsForCurrentEmployee();
  }

  fetchContractsForCurrentEmployee() {
    this.employeeService.getAllContractsForCurrentEmployee()
      .subscribe(
        (cgs: Array<ContractGadget>) => {
          this.ELEMENT_DATA = cgs.map(cg => ({
            ...cg,
            startDate: this.convertToValidDate(cg.startDate),
            endDate: this.convertToValidDate(cg.endDate),
            status: this.convertToEnumStatus(cg.status)
          } as ContractGadget));
          this.dataSource = new MatTableDataSource<ContractGadget>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        },
        (error) => console.log(error)
      );
  }

  convertToValidDate(date: string) {
    return isValidDate(date) ? moment(date).format('DD-MM-YYYY') : '-';
  }

  convertToEnumStatus(status: string) {
    return Status[status];
  }
  
  openDialog(element: ContractGadget): void {
    const dialogRef = this.dialog.open(UpdateContractDialog, {
      width: '300px',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchContractsForCurrentEmployee();
    });
  }

}

@Component({
  selector: 'update-contract-dialog',
  templateUrl: 'update-contract-dialog.component.html',
  styleUrls: ['./update-contract-dialog.component.css']
})
export class UpdateContractDialog implements OnInit {

  statuses: StatusCustom[] = [
    {value: Status.Received, viewValue: 'Received'},
    {value: Status.WorkInProgress, viewValue: 'Work in progress'},
    {value: Status.PickUp, viewValue: 'Pick up'},
    {value: Status.Finished, viewValue: 'Finished'},
  ];

  contractUpdateForm = new FormGroup({
    endDate: new FormControl('', [
      Validators.required
    ]),
    status: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private employeeService: EmployeeService,
    private contractService: ContractService,
    public dialogRef: MatDialogRef<UpdateContractDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ContractGadget
  ) {    
    this.contractService.getById(this.data.id)
      .subscribe((contract: Contract) => {
        isValidDate(contract.endDate) ? this.contractUpdateForm.controls['endDate'].patchValue(contract.endDate) : null;
        this.contractUpdateForm.controls['status'].patchValue(contract.status);
      });
  }

  ngOnInit() {
    
  }

  onSubmitUpdateContractForm() {
    this.employeeService.updateContract({
      id: this.data.id,
      endDate: this.contractUpdateForm.value.endDate,
      status: this.contractUpdateForm.value.status
    } as ContractUpdateForm)
    .subscribe(
      () => {
        console.log(this.contractUpdateForm.value);
        this.dialogRef.close();
      },
      (error) => console.log(error)
    )
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}