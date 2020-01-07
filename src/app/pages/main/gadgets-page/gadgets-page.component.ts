import { Gadget } from './../../../server-connection/models/gadget';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GadgetService } from '../../../server-connection/services/gadget.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-gadgets-page',
  templateUrl: './gadgets-page.component.html',
  styleUrls: ['./gadgets-page.component.css']
})
export class GadgetsPageComponent implements OnInit {

  selectedRowIndex: string = '';

  ELEMENT_DATA: Gadget[] = [];
  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<Gadget>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Output() gadgetSelectEvent = new EventEmitter<Gadget>();

  constructor(
    private gadgetService: GadgetService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchGadgetsForCustomer();
  }

  fetchGadgetsForCustomer() {
    this.gadgetService.getAllForCustomer()
      .subscribe(
        (gadgets: Array<Gadget>) => {
          this.ELEMENT_DATA = gadgets;
          this.dataSource = new MatTableDataSource<Gadget>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        },
        (error) => console.log(error)
      );
  }

  rowGadgetSelected(selectedGadget: Gadget) {
    this.selectedRowIndex = selectedGadget.id;
    this.gadgetSelectEvent.emit(selectedGadget);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddGadgetDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchGadgetsForCustomer();
    });
  }

}

@Component({
  selector: 'add-gadget-dialog',
  templateUrl: 'add-gadget-dialog.component.html',
  styleUrls: ['./add-gadget-dialog.component.css']
})
export class AddGadgetDialog {

  addGadgetForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [])
  });

  constructor(
    private gadgetService: GadgetService,
    public dialogRef: MatDialogRef<AddGadgetDialog>
  ) { }

  onSubmitAddGadgetForm() {
    console.log(this.addGadgetForm);
    this.gadgetService.create({
      name: this.addGadgetForm.value.name,
      description: this.addGadgetForm.value.description
    } as GadgetForm).subscribe(() => {
      this.dialogRef.close();
    },
      (error) => console.log(error)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}