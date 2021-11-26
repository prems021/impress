

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

import { Viewjob_dets_Component } from '../new/new';

import { Columns, Config, DefaultConfig,API,APIDefinition } from 'ngx-easy-table';



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
  selector: 'app-dtp-finished-work',
  templateUrl: './finished.html',
  styleUrls: ['./finished.scss'],
})
export class Dtp_finished_work_Component implements OnInit {

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
    
      { key: '', title: 'View' },
      
      
    
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
      this.apiService.getDesignWorks_finished().subscribe((result: any) => {
      this.make_data(result.data.rows,result.data.count)
    });
  }

  showModal(row:any): void {
   console.log('row',row)
   this.selected_Wid = row.Wid;

    const dialogRef = this.dialog.open(Viewjob_dets_Component, {
      width: '80%',
      data: { Wid: this.selected_Wid }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });


  }

  Forward(row:any)
  {
    this.push_forw = 2;
    this.selected_Wid = row.Wid;
    this.apiService.sendtoPlan(this.selected_Wid).subscribe((result: any) => {
      if (result['success'] === true) {
        this.openSnackbar('Work sent to Plan', 'Ok');
        this.push_forw = 3;
       
      } else {
        alert('Error Occured');
        this.push_forw = 1;
      }
    });

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
 
  }

  make_data(data:any,count:number)
  {
    console.log('data',data)
   
     while(this.list_data.length > 0)
     {
      this.list_data.pop();
     }


    for(var i=0;i<count;i++)
    {
      if(this.list_data.length < count)
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
       
  }

 

  changedtpStatus(i: number) {
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



 }


