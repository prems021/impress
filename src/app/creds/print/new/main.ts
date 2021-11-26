import { numarr } from './../../office/edit-order/paper_model';


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
  w_id : number;
  workNo: number ;
  workName : string;
  orderDate : string;
  type : string;
  Gsm: string;
  Papertype: string;
  Size: string;
  paper_det_id : number;
  paper_status : string;
  paper_qty_req : number;
  paper_qty_released : number;
  Paper_company : string;
  push_b : number ;
  paper_category : string;
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
plate_status : string;
Qty_splited : number;
sub_status : string;

}

@Component({
  selector: 'app-print-active-work',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Print_active_work_Component implements OnInit {

  public columns_new_work: Columns[];
  public configuration: Config;

  list_data : work_list[] = []
  resultsLength = 0;
  push_forw : number = 0;
  modal:boolean = false;
  selected : any;
  selected_Wid : number = 0;
  load_lag : number = 0;

  public data_new_work = [];

  @ViewChild('table', { static: true }) table: APIDefinition;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  type: string;
  paper_company: any;
  realesed_qty: any;
  paper_status: string;
  paper_category: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService,
    private _httpClient: HttpClient, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {


    this.fetchData();



    this.columns_new_work = [
      { key: 'workNo', title: 'Work No' },
      { key: 'workName', title: 'Work Name' },
      { key: 'orderDate', title: 'Date' },
      { key: '', title: 'Type' },
      { key: '', title: 'View' },
      { key: '', title: '' },

        ];



        this.configuration = { ...DefaultConfig };
        this.configuration.searchEnabled = false;
        this.configuration.resizeColumn = true;
        this.configuration.fixedColumnWidth = false;
        this.configuration.showDetailsArrow = true;
        this.configuration.detailsTemplate = true;


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
      this.apiService.get_new_printing_works(this.apiService.building).subscribe((result: any) => {
      this.make_data_new(result.data)

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

     const dialogRef = this.dialog.open(print_action_Component, {
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
        this.load_lag = 0;
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


  View_machines($event: MouseEvent, index: number,row:any)
  {

    const dialogRef = this.dialog.open(print_view_machines_Component, {
      width: '80%',
      data: row.paper_det_id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  onEvent(event: { event: string; value: any }): void {

  }

  make_data_new(data:any)
  {

     console.log('data',data);

     while(this.list_data.length > 0)
     {
      this.list_data.pop();
     }


    for(var i=0;i<data.rows.length;i++)
    {



      if(data.rows[i].company_list != null)
      {
        this.paper_company = data.rows[i].company_list.Company_name
      }
      if(data.rows[i].qty_released_from_store != null )
      {
         this.realesed_qty = data.rows[i].qty_released_from_store
      }
      else{
        this.realesed_qty = 0;
      }

      switch (data.rows[i].paper_category_id) {
        case 1:
          this.paper_category = 'Roll'
            break;
        case 2:
          this.paper_category = 'Sheet'
            break;
         default:
              this.paper_category = 'No Information Available'
              break;
          }

      switch (data.rows[i].white_flag) {
        case 1:
          this.paper_status = 'On Store Queue'
            break;
        case 2:
          this.paper_status = 'Released from store'
            break;
        case 3:
          this.paper_status = 'Delivered from store'
            break;

        default:
          this.paper_status = 'No Information Available'
            break;
      }




        this.list_data.push({"w_id":data.rows[i].work_order.Wid,"workNo":data.rows[i].work_order.workNo,"workName":data.rows[i].work_order.workName,
        "orderDate":data.rows[i].work_order.orderDate,"paper_det_id":data.rows[i].id,"type":'Initial',"Gsm":data.rows[i].Paper_master.Gsm,
        "Papertype":data.rows[i].Paper_master.Papertype,"Size":data.rows[i].Paper_master.Size , "Paper_company":this.paper_company,
        "paper_qty_released":this.realesed_qty,"paper_qty_req":data.rows[i].quantity,
        "paper_status":this.paper_status , "push_b": 1,"paper_category":this.paper_category});

    }

    this.load_lag = 1;
    this.data_new_work =  this.list_data;
  }

}




@Component({
  selector: 'app-print-machine',
  templateUrl: './machine-view.html',
  styleUrls: ['./main.scss']
})




export class print_view_machines_Component implements OnInit {
  status_flag : number = 0;
  start  : number = 0;
  end : number = 0;
  intent_flag : number = 0;
  sub_list : work_sub_list[] = [];
  view_sub: number = 0;
  sub_status: string;
  plate_status: string;
  load_lag_sub : number = 0;
  constructor(private router: Router, private apiService: ApiService, private _httpClient: HttpClient,private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    public dialogRef_1: MatDialogRef<print_view_machines_Component>, @Inject(MAT_DIALOG_DATA) public data_: any, public dialog: MatDialog) { }
  ngOnInit() {
    console.log('data_ijnj',this.data_)
    while(this.sub_list.length > 0)
    {
     this.sub_list.pop();
    }

   this.fetch_sub_data()

   // this.make_daatta(this.data_)
  }

  fetch_sub_data()
  {


  this.apiService.get_printing_works_splits(this.data_).subscribe((result: any) => {

    console.log('dataa,,,,,',result)
    this.make_daatta(result.data)
  })

  }


  make_daatta(data:any)
  {
    for(var ik=0;ik<data.rows.length;ik++)
    {

      switch (data.rows[ik].status_flag) {
        case 1:
          this.sub_status = 'machine selected'
            break;
        case 2:
          this.sub_status = 'cutting completed (bypass cutting)'
            break;
        case 3:
          this.sub_status = 'machine reading inserted'
            break;

            case 4:
              this.sub_status = 'forwared to cutting (direct)'
                break;
            default:
          this.sub_status = 'No Information Available'
            break;
      }

      switch (data.rows[ik].plate_flag) {
        case 0:
          this.plate_status = 'Plate set pending'
            break;
        case 1:
          this.plate_status = 'Plate set completed'
            break;
            default:
          this.plate_status = 'No Information Available'
            break;
      }


     // 1  machine selected , 2  cutting completed (bypass cutting) ,
      // 4  machine reading inserted , 5  forwared to cutting (direct) 6  cutting completed direct & indirect




       this.sub_list.push({"id":data.rows[ik].id,"machine":data.rows[ik].machine,
       "plate_status":this.plate_status,"plate_size":data.rows[ik].plate_size,
       "plates":data.rows[ik].plates,"printplace":data.rows[ik].printplace,
       "sub_status":this.sub_status,
       "remarks":data.rows[ik].remarks,"workNo":0,"work_order_details_id":data.rows[ik].work_order_details_id,"Qty_splited":data.rows[ik].qty_splitted
      })

    }

    this.load_lag_sub = 1;
  }

  Add_Item_reading(data:any,i:number)
  {
    console.log('i',i);
    console.log('d',data);
    const dialogRef_2 = this.dialog.open(print_action_Component, {
      width: '80%',
      data: data
    });
    dialogRef_2.afterClosed().subscribe(result => {
      //this.fetchData();
    });

  }

  Save()
  {

  }
  change_in_end()
  {

  }
  change_in_start()
  {

  }
  closeFunction() {
    this.dialogRef_1.close();
  }
}



@Component({
  selector: 'app-print-set-action',
  templateUrl: './print-action.html',
  styleUrls: ['./main.scss']
})
export class print_action_Component implements OnInit {


  load_flag: number = 0;
  abc: string;
  workform: FormGroup;

  ia : number = 0;
  push_disabled :boolean = false;
  load_lag_action : number = 0;
  dataum : Data_s;

  paper_in_hand : number = 0;
  relesed_paper_qty : number = 0;
  remaining_paper_qty : number = 0;

  local_used_paper_qty : number = 0;
  global_used_paper_qty : number = 0;

  start  : number = 0;
  end : number = 0;

  status_flag : number = 0;

  save_flag : number = 1;


  save_data: any;
  constructor(private router: Router, private apiService: ApiService, private _httpClient: HttpClient,private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              public dialogRef_2: MatDialogRef<print_action_Component>, @Inject(MAT_DIALOG_DATA) public data_2: any, public dialog: MatDialog) {

                this.load_flag = 0;
               }

  ngOnInit() {


      console.log('fd',this.data_2)

     this.apiService.get_paper_infos_main_and_sub_for_print_new_work_incl_excess_paper(this.data_2.work_order_details_id).subscribe((result: any) => {

      if(result.success != false)
      {
        this.make_susu_(result)
      }
      else
      {
        alert('No item Found')
      }
     })

  }

  make_susu_(data:any)
  {
    console.log('data...X',data);
    if(data.data2.Quantity != null || data.data2.Quantity != undefined)
    {
      this.paper_in_hand = data.data2.Quantity;
    }

    if(data.data.qty_released_from_store != null || data.data.qty_released_from_store != undefined)
    {
    this.relesed_paper_qty = data.data.qty_released_from_store
    }
    this.load_lag_action = 1;
    this.global_used_paper_qty = 0

    for(var x=0;x<data.data.Work_order_paper_subs.length;x++)
    {
      if(data.data.Work_order_paper_subs[x].used_paper != null)
      {
        this.global_used_paper_qty = this.global_used_paper_qty + data.data.Work_order_paper_subs[x].used_paper;
      }

    }

    this.remaining_paper_qty = (this.paper_in_hand + this.relesed_paper_qty) - this.global_used_paper_qty;

  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }






  Save()
  {

    this.local_used_paper_qty = this.end - this.start;

    if(this.local_used_paper_qty <= 0)
    {
      alert('Invalid Machine reading...')
    }
    else
    {
       //   if()


    }



     this.save_data = {
                          start : this.start,
                          end: this.end,
                          paper_sub_id : this.data_2.id,
                          used_paper : this.local_used_paper_qty
                      }

                      this.apiService.save_machine_readings(this.save_data).subscribe((result: any) => {
                        console.log('result',result);
                        if(result.success == true)
                        {
                          this.openSnackbar(result.msg,'ok');
                          this.closeFunction();
                        }
                        else
                        {
                          alert(result.msg)
                        }
                        })



  //     Wid: this.paperdata.work_order.Wid,
  //     pid: this.paperdata.id,
  //     paper_qty_used_from_inhand : this.used_from_hand,

  //     used_qty : this.used_qty,
  //     qty_remain : this.remaining_qty,
  //     paper_master_id: this.paperdata.paper_master_id,
  //     paper_category_id : this.paperdata.paper_category_id,
  //     building : this.apiService.building,
  //     company : this.paperdata.paper_master_id
  //   }
  //   if(this.start >= this.end)
  //   {
  //     alert('end reading should be greater than start')
  //   }
  //   else
  //   {
  //      if(this.remaining_qty < 0)
  //      {
  //        alert('invalid readings');
  //      }
  // }



}

  closeFunction() {
    this.dialogRef_2.close();
  }
}



