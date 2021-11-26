

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
import { Data_s } from './model';



export interface work_list {
   Wid : number,
   workNo: number ;
   workName : string;
   orderDate : string;
   dtpStat : string;
   dtp_status : string;
   stat : string;


}

export interface work_sub_list {


workNo : number;
id: number;
machine: string;
plate_size: string;
plates: number ;
printplace: string;
remarks: string;
work_order_details_id: number;
plate_flag : number;


}

@Component({
  selector: 'app-plate-active-work',
  templateUrl: './new.html',
  styleUrls: ['./new.scss'],
})
export class Plate_active_work_Component implements OnInit {

  public columns_new_work: Columns[];
  public configuration: Config;




  list_data : work_list[] = []
  resultsLength = 0;
  push_forw : number = 0;
  modal:boolean = false;
  selected : any;
  selected_Wid : number = 0;
  load_flag : number = 0;

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
      { key: '', title: 'Action' },
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
    //   this.apiService.get_all_work_list_b_w(25,30).subscribe((result: any) => {
    //   this.make_data(result.data)
    // });

    this.apiService.get_all_work_list_new_plate_set().subscribe((result: any) => {
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

  showModal_action(row:any): void {
    console.log('row',row)
     this.selected_Wid = row.Wid;

     const dialogRef = this.dialog.open(plateset_action_Component, {
       width: '80%',
       data: { Wid: this.selected_Wid }
     });
     dialogRef.afterClosed().subscribe(result => {
       this.fetchData();
     });

   }

   Forward_work(row:any)
  {

     this.push_forw = 2;
    console.log('row',row)
    this.selected_Wid = row.Wid;



    this.apiService.forward_work_from_plate_set(this.selected_Wid).subscribe((result: any) => {

      console.log('result',result)

      
      if (result['success'] === true) {
       
        this.openSnackbar('Work Forwarded', 'Ok');
        this.load_flag = 0;
        this.data_new_work = [];
        setTimeout (() => {
        this.fetchData();
    }, 2000);


      } else {
        
        alert(result.msg);

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

   console.log('data')

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






@Component({
  selector: 'app-plate-set-action',
  templateUrl: './plate-action.html',
  styleUrls: ['./new.scss']
})
export class plateset_action_Component implements OnInit {

 // setWork: Work;
  load_flag: number = 0;
  abc: string;
  workform: FormGroup;
  //res_data : RootObject;
  ia : number = 0;
  push_disabled :boolean = false;

  dataum : Data_s
   sub_list : work_sub_list[] = [];
  constructor(private router: Router, private apiService: ApiService, private _httpClient: HttpClient,private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<plateset_action_Component>, @Inject(MAT_DIALOG_DATA) public data_: any, public dialog: MatDialog) {

                this.load_flag = 0;
               }

  ngOnInit() {




    this.apiService.get_paper_infos_main_and_sub_for_plateset_new_work(this.data_.Wid).subscribe((result: any) => {



        if (result['success'] === true) {

          console.log('data..uuu',result);
          this.dataum = result.data;
          this.make_data(this.dataum.Work_order_paper_details)
        } else {
          alert('Error Occured');
          this.dialogRef.close();
        }
      });


  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }





  make_data(data:any)
  {

      while(this.sub_list.length > 0)
     {
      this.sub_list.pop();
     }


    console.log('data++++++++++++',data)

    this.ia = data.length;
    for(var i = 0;i<this.ia;i++)
    {
      for(var j = 0;j<data[i].Work_order_paper_subs.length;j++)
      {
      console.log('res',data[i].Work_order_paper_subs[j].id)

      this.sub_list.push({"workNo":data[i].Work_order_paper_subs[j].workNo,"id":data[i].Work_order_paper_subs[j].id,"machine" : data[i].Work_order_paper_subs[j].machine,
      "plate_size": data[i].Work_order_paper_subs[j].plate_size,"plates":  data[i].Work_order_paper_subs[j].plates , "printplace": data[i].Work_order_paper_subs[j].printplace,
      "work_order_details_id": data[i].Work_order_paper_subs[j].work_order_details_id,"remarks":data[i].Work_order_paper_subs[j].remarks,"plate_flag":data[i].Work_order_paper_subs[j].plate_flag

        });
      }
    }


     this.load_flag = 1;

  }

  mark_completed(id:number)
  {
    console.log('id',id);

    this.apiService.mark_completed_for_plateset_new_work(id).subscribe((result: any) => {
      if (result['success'] === true) {
        setTimeout (() => {
          this.ngOnInit();
    }, 2000);

            
      } else {
        alert('Error Occured');
        this.dialogRef.close();
      }
    });


  }



  closeFunction() {
    this.dialogRef.close();
  }
}



