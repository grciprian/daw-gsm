import { Gadget } from './../../../server-connection/models/gadget';
import { Status, Contract } from './../../../server-connection/models/contract';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ContractService } from './../../../server-connection/services/contract.service';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {

  @Input() selectedGadgetObservable: Observable<Gadget>;
  selectedGadget: Gadget;

  ELEMENT_DATA: Contract[] = [];
  displayedColumns: string[] = ['startDate', 'endDate', 'status', 'observations'];
  dataSource = new MatTableDataSource<Contract>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private contractService: ContractService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.selectedGadgetObservable.subscribe((selectedGadget: Gadget) => {
      this.selectedGadget = selectedGadget;
      this.selectedGadgetChanged();
    });
  }

  selectedGadgetChanged() {
    if (this.selectedGadget) {
      this.contractService.getAllByGadgetId(this.selectedGadget.id)
        .subscribe(
          (contracts: Array<Contract>) => {
            this.ELEMENT_DATA = contracts.map(c => ({
              ...c,
              startDate: this.convertToValidDate(c.startDate),
              endDate: this.convertToValidDate(c.endDate),
              status: this.convertToEnumStatus(c.status)
            }));
            this.dataSource = new MatTableDataSource<Contract>(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
          },
          (error) => console.log(error)
        );
    }
  }

  convertToValidDate(date: string) {
    return moment(date).isAfter('1950-01-01', 'years') && moment(date).isBefore('2100-01-01', 'years') ? moment(date).format('DD-MM-YYYY') : '-';
  }

  convertToEnumStatus(status: string) {
    return Status[status];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContractDialog, {
      width: '300px',
      data: { selectedGadget: this.selectedGadget }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedGadgetChanged();
    });
  }

}

@Component({
  selector: 'add-contract-dialog',
  templateUrl: 'add-contract-dialog.component.html',
  styleUrls: ['./add-contract-dialog.component.css']
})
export class AddContractDialog {

  addContractForm = new FormGroup({
    observations: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(
    private contractService: ContractService,
    public dialogRef: MatDialogRef<AddContractDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmitAddContractForm() {
    this.contractService.create({
      gadgetId: this.data.selectedGadget.id,
      observations: this.addContractForm.value.observations
    } as ContractForm).subscribe(() => {
      this.dialogRef.close();
    },
      (error) => console.log(error)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}