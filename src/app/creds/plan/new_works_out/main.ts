




import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApiService  } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Viewjob_dets_Component } from '../../dtp/view/new/new';
import { Columns, Config, DefaultConfig,API,APIDefinition } from 'ngx-easy-table';
import { RootObject,Workorderpapersub } from './model'


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
  selector: 'app-dtp-active-work-out',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Plan_active_work_out_Component implements OnInit {

  public columns_new_work: Columns[];
  public configuration: Config;



  dtpform: FormGroup;

  load_flag : number = 0;
  list_data : work_list[] = []
  resultsLength = 0;
  push_forw : number = 0;
  modal:boolean = false;
  selected : any;
  selected_Wid : number = 0;


  public data_new_work = [];

  @ViewChild('table', { static: true }) table: APIDefinition;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,
    private _httpClient: HttpClient, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {


    this.fetchData();



    this.columns_new_work = [
      { key: 'workNo', title: 'Work No' },
      { key: 'workName', title: 'Work Name' },
      { key: 'orderDate', title: 'Date' },
      { key: '', title: 'View' },

      { key: '', title: 'Forward' },

        ];



    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = false;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;


  }

  ngOnDestroy() {

  }


  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }

  fetchData() {
      this.apiService.get_all_plan_work_list_out().subscribe((result: any) => {
      this.make_data(result.data)
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
    console.log('row',row)
    this.selected_Wid = row.Wid;



    this.apiService.forward_work_from_plan(this.selected_Wid).subscribe((result: any) => {
      if (result['success'] === true) {
        this.openSnackbar('Work Forwarded', 'Ok');
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

  make_data(data:any)
  {



     while(this.list_data.length > 0)
     {
      this.list_data.pop();
     }


    for(var i=0;i<data.count;i++)
    {
      if(this.list_data.length < data.count)
      {
        this.list_data.push({"workNo":0,"workName":'',"stat":'',"orderDate":'',"dtpStat":'',"dtp_status":'',"Wid":0});
      }

      this.list_data[i].Wid = data.rows[i].Wid;
      this.list_data[i].workName = data.rows[i].workName;
      this.list_data[i].workNo = data.rows[i].workNo;
      this.list_data[i].orderDate = data.rows[i].orderDate;

    }

    console.log('res',this.list_data)
    this.data_new_work = this.list_data;
    this.push_forw = 1;
    this.load_flag = 1;

  }

}







