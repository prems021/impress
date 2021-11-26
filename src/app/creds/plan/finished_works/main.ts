

import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ApiService  } from '../../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of as observableOf, Subscription } from 'rxjs';

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
  selector: 'app-dtp-finished-work-in',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Plan_active_work_in_Component_fin implements OnInit {

  public columns_new_work: Columns[];
  public configuration: Config;

  dtpform: FormGroup;


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


    this.fetchData();



    this.columns_new_work = [
      { key: 'workNo', title: 'Work No' },
      { key: 'workName', title: 'Work Name' },
      { key: 'orderDate', title: 'Date' },
      { key: '', title: 'View' },
      { key: '', title: 'Action' },
     

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
      this.apiService.get_all_plan_work_list_finished().subscribe((result: any) => {
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

     const dialogRef = this.dialog.open(Job_plan_action_Component_fin, {
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

  }

}








@Component({
  selector: 'app-plan-action',
  templateUrl: './plan-action.html',
  styleUrls: ['./main.scss']
})
export class Job_plan_action_Component_fin implements OnInit {

 // setWork: Work;
  load_flag: number = 0;
  abc: string;
  workform: FormGroup;
  res_data : RootObject;
  ia : number = 0;
  push_disabled :boolean = false;


  constructor(private router: Router, private apiService: ApiService, private _httpClient: HttpClient,private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Job_plan_action_Component_fin>, @Inject(MAT_DIALOG_DATA) public data_: any, public dialog: MatDialog) {

                this.load_flag = 0;
               }

  ngOnInit() {

    this.workform = this.formBuilder.group(
      {
        Paper_category: ['', Validators.required],
        Print_location: ['',[Validators.required]],
        Cut_location: ['', [Validators.required]],
        adv_Cut_location : [0, [Validators.required]],
        Qty_needed: ['', Validators.required],
      })


    this.apiService.get_paper_infos_main_and_sub(this.data_.Wid).subscribe((result: any) => {
        if (result['success'] === true) {

          console.log('data',result);
          this.res_data = result;

          this.ia = result.data.count;
          this.load_flag = 1;

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

  splitItem(item:any,k:number)
  {
   console.log('i',item);
   console.log('k',k);

   const dialogRef = this.dialog.open(Job_plan_action_split_Component_fin, {
    width: '80%',
    data: { data: item , index : k }
  });
  dialogRef.afterClosed().subscribe(result => {
    //this.fetchData();
  });


  }

  assign_data(data:any,id:number)
  {

    if(this.workform.valid == true)
    {
      console.log('data',data,id);

      this.apiService.assign_location_on_Plan(data,id).subscribe((result: any) => {
          if (result['success'] === true) {
            this.openSnackbar('Work updated.', 'Ok');
            this.dialogRef.close();
          } else {
            alert('Error Occured');
            this.dialogRef.close();
          }
        });


    }
  else
  {
    this.openSnackbar('Pls Fill Data', 'Ok');
  }

  }





  closeFunction() {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'app-plan-action-split',
  templateUrl: './plan-action-split.html',
  styleUrls: ['./main.scss']
})
export class Job_plan_action_split_Component_fin implements OnInit {

 // setWork: Work;
  load_flag: number = 0;
  abc: string;
  machine_form : FormGroup;
  res_data : RootObject;
  ia : number = 0;
  push_disabled :boolean = false;
  view_table_sub : number = 0;
  papersub : Workorderpapersub [] = []
  ref_qty : number = 0 ;
  ref_allocated : number = 0 ;
  machines: string[] = [];
  constructor(private router: Router, private apiService: ApiService, private _httpClient: HttpClient,private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Job_plan_action_Component_fin>, @Inject(MAT_DIALOG_DATA) public data_: any, public dialog: MatDialog) {

                this.load_flag = 0;
               }

  ngOnInit() {


    this.machine_form = this.formBuilder.group(
      {
        print_type: ['', Validators.required],
        Machine: ['',[Validators.required]],
        Qty_alloted: ['', [Validators.required]],
        Plates: ['', Validators.required],
        remark : ['']
      })



    console.log('data_',this.data_);
    this.ref_qty = this.data_.data.quantity;
    this.init_job();
    
  }

init_job()
{
  this.apiService.get_avail_splits_on(this.data_.data.id).subscribe((result: any) => {
    if (result['success'] === true) {
     
      console.log('res',result)

      if(result.data.count > 0)
      {
        this.papersub = result.data.rows;
        this.view_table_sub = 2 ;

         for(var i = 0; i<result.data.count;i++)
         {
          this.ref_allocated = this.ref_allocated + this.papersub[i].qty_splitted;
         }


      }
      else{
        this.view_table_sub = -1 ;
      }
      
     
    } else {
      alert('Error Occured');
      this.dialogRef.close();
    }
  });
}

  submitForm()
  {
    if(this.machine_form.valid == true)
    {

      this.view_table_sub = 0 ;

      if(this.ref_allocated + this.machine_form.controls.Qty_alloted.value > this.ref_qty)
      {
        alert('Split Qty Exceeds the limit');
        this.dialogRef.close();
      }
      else
      {
        this.apiService.add_splits_on_paper(this.data_.data.id,this.machine_form.value).subscribe((result: any) => {
          if (result['success'] === true) {
           this.init_job();
           this.machine_form.reset();
          }
          else
          {
            alert('Error Occured');
            this.dialogRef.close();
          }
        })
      }    
    }
  }

  remove_split(id:number)
  {
   console.log('id',id);
   this.apiService.remove_splits_on_paper(id).subscribe((result: any) => {
    if (result['success'] === true) {
     this.init_job();
    }
    else
    {
      alert('Error Occured');
      this.dialogRef.close();
    }
  })
  }
  add_new_()
  {
    this.view_table_sub = 1;
  }
  closeFunction()
  {
    this.dialogRef.close();
  }

  getmachines() {

    const paper_dets_ = this.machine_form.get('print_type') 
    if(this.machine_form.controls.print_type.value === 'Sheet B/W')
    {
      this.machines = ['HMT 2 Color','HMT D/Demy (Office)','Dominent','RISO','Laser','Ryobi','Manugraph','KOMORI','HMT D/Demy Annexe'];
    } else if (this.machine_form.controls.print_type.value  === 'Sheet Colour') {
      this.machines = ['HMT 2 Color','HMT D/Demy (Office)','Dominent','RISO','Laser','Ryobi','Manugraph','KOMORI','HMT D/Demy Annexe'];
    } else if (this.machine_form.controls.print_type.value === 'Sheet Extra B/W') {
      this.machines = ['HMT 2 Color','HMT D/Demy (Office)','Dominent','RISO','Laser','Ryobi','Manugraph','KOMORI','HMT D/Demy Annexe'];
    } else if (this.machine_form.controls.print_type.value=== 'Sheet Cover Colour') {
      this.machines = ['HMT 2 Color','HMT D/Demy (Office)','Dominent','RISO','Laser','Ryobi','Manugraph','KOMORI','HMT D/Demy Annexe'];
    } else if (this.machine_form.controls.print_type.value === 'Web B/W') {
      this.machines = ['Orient','Manugraph'];
    } else if (this.machine_form.controls.print_type.value === 'Web Two Colour') {
      this.machines = ['Orient','Manugraph'];
    } else if (this.machine_form.controls.print_type.value === 'Digital Laser B/W') {
      this.machines = ['Black and White'];
    } else if (this.machine_form.controls.print_type.value === 'Digital Laser Colour') {
      this.machines = ['Colour'];
    } else if (this.machine_form.controls.print_type.value === 'Risso B/W') {
      this.machines = ['Black and White'];
    } else if (this.machine_form.controls.print_type.value === 'Screen Printing Single') {
      this.machines = ['Manual','Machine'];
    }
  }

}







