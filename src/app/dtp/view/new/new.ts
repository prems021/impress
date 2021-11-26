

import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ApiService  } from '../../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of as observableOf, Subscription } from 'rxjs';



import { Columns, Config, DefaultConfig,API,APIDefinition } from 'ngx-easy-table';

// import { Work } from 'src/app/Models/work';
// import { FinishviewdtpComponent } from '../../components/finished_view_dtp/main';

export interface WorkData {

}

export interface WorkApi {
  data: WorkData[];
  total_count: number;
}

export interface Dtpdesign {
  Wid: number;
  dtpstat: number;
}





export interface work_list {
   Wid : number,
   workNo: number ;
   workName : string;
   orderDate : string;
   dtpStat : string;
   dtp_status : string;
   stat : string;

}

@Component({
  selector: 'app-dtp-active-work',
  templateUrl: './new.html',
  styleUrls: ['./new.scss'],
})
export class Dtp_active_work_Component implements OnInit {

  public columns_new_work: Columns[];
  public configuration: Config;

  dtpform: FormGroup;
  cutting: Dtpdesign;
  displayedColumns: string[] = ['workNo', 'workName', 'orderDate', 'dtpStat', 'stat', 'actionview', 'action'];

  workinfo = new MatTableDataSource<WorkData>();
  list_data : work_list[] = []
  resultsLength = 0;
  push_forw : number = 0;
  modal:boolean = false;
  selected : any;
  selected_Wid : number = 0;
  load_flag : number =  0;
  private updateSubscription: Subscription;

  public data_new_work = [];

  @ViewChild('table', { static: true }) table: APIDefinition;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,
    private _httpClient: HttpClient, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dtpform = this.formBuilder.group({
      dtpstat: [0, [Validators.required]]
    });
    this.workinfo.sort = this.sort;
    this.workinfo.paginator = this.paginator;
    this.fetchData();



    this.columns_new_work = [
      { key: 'workNo', title: 'Work No' },
      { key: 'workName', title: 'Work Name' },
      { key: 'orderDate', title: 'Date' },
      { key: 'dtpStat', title: 'Status' },
      { key: 'stat', title: 'Status' },
      { key: '', title: 'View' },
      { key: '', title: 'Forward' },


        ];



    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = false;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;

    this.updateSubscription = interval(600000).subscribe(
      (val) => { this.fetchData() } );
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  public doFilter = (value: string) => {
    this.workinfo.filter = value.trim().toLocaleLowerCase();
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }

  fetchData() {
      this.apiService.getDesignWorks().subscribe((result: any) => {
      this.make_data(result.data)
    });
  }

  showModal(row:any): void {
   console.log('row',row)
   this.selected_Wid = row.Wid;

    const dialogRef = this.dialog.open(Viewjob_dets_Component, {
      width: '90%',
      data: { Wid: this.selected_Wid }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });


  }

  Forward(row:any)
  {
    if(row.dtp_status != 'Customer Approved')
    {
      alert('Only customer approved jobs can be forwarded')
    }
    else{

      this.load_flag = 0;
    console.log('row',row)
    this.push_forw = 2;
    this.selected_Wid = row.Wid;
    this.apiService.sendtoPlan(this.selected_Wid).subscribe((result: any) => {
      if (result['success'] === true) {
        this.openSnackbar('Work sent to Plan', 'Ok');
        this.push_forw = 3;
        this.fetchData();

      } else {
        alert('Error Occured');
        this.push_forw = 1;
      }
    });

  }

  }

  hideModal(): void {
    this.modal = false;
  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }


  onEvent(event: { event: string; value: any }): void {
    // this.selected = JSON.stringify(event.value.row, null, 2);
    // console.log('selected',this.selected);
  }

  make_data(data:any)
  {
    // console.log('res..',data)
    // console.log('res..',data.length)

     while(this.list_data.length > 0)
     {
      this.list_data.pop();
     }


    for(var i=0;i<data.length;i++)
    {
      if(this.list_data.length < data.length)
      {
        this.list_data.push({"workNo":0,"workName":'',"stat":'',"orderDate":'',"dtpStat":'',"dtp_status":'',"Wid":0});
      }

      this.list_data[i].Wid = data[i].Wid;
      this.list_data[i].workName = data[i].workName;
      this.list_data[i].workNo = data[i].workNo;
      this.list_data[i].orderDate = data[i].orderDate;

      switch (data[i].status_flag) {
        case 11:
          this.list_data[i].dtp_status = 'Customer Awaiting'
            break;
        case 12:
          this.list_data[i].dtp_status = 'Correction Pending'
            break;
        case 13:
          this.list_data[i].dtp_status = 'Proof Reading'
            break;
        case 14:
          this.list_data[i].dtp_status = 'Customer Approved'
            break;

        default:
            console.log("No such option exists!");
            break;
    }

    }

    console.log('res',this.list_data)
    this.data_new_work = this.list_data;
    this.workinfo.data = this.list_data;
    this.resultsLength = this.workinfo.data.length;
    this.push_forw = 1;
    this.load_flag = 1;

  }



  changedtpStatus(i: number) {
    this.load_flag = 0;
    console.log('iindex',i);

    switch (this.dtpform.get('dtpstat').value) {
      case 'Customer Awaiting':
        this.cutting = {
          Wid: i,
          dtpstat: 11
        };
          break;
      case 'Correction Pending':
        this.cutting = {
          Wid: i,
          dtpstat: 12
        };
          break;
      case 'Proof Reading':
        this.cutting = {
          Wid: i,
          dtpstat: 13
        };
          break;
      case 'Customer Approved':
        this.cutting = {
          Wid: i,
          dtpstat: 14
        };
          break;

      default:
          console.log("No such option exists!");
          break;
  }


    if (this.dtpform.valid) {

      this.apiService.Change_dtp_Status(this.cutting).subscribe((sta:any) => {
        if (sta.success === true) {
          this.openSnackbar('Status Changed', 'Ok');
          this.dtpform.reset();
          this.fetchData();
        } else {
          alert('Error Occured');
        }
      });

    } else {
      alert('Incorrect Status');
    }
  }

  openView(id: string): void {

  }

  openDialog(id: string, st: string, no: string): void {

}













 }


 @Component({
  selector: 'app-view-componet-a-job',
  templateUrl: './view-job-dets.html',
  styleUrls: ['./new.scss']
})
export class Viewjob_dets_Component implements OnInit {

  details: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private _httpClient: HttpClient,
    private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Viewjob_dets_Component>, @Inject(MAT_DIALOG_DATA) public data1: any) { }

  ngOnInit() {
   // this.viewdetails();
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }

  viewdetails() {

    // this.apiService.viewWork(this.data1.Wid).subscribe((result: any) => {
    //   console.log('log.#',result);
    //     this.details = result;

    //     console.log('log',this.details)

    // });
  }

  view_change(e:any)
  {
    console.log('e',e)
  }


  closeFunction() {
    this.dialogRef.close();
  }
}
