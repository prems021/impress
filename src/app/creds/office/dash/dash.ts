


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
// import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
//import { ShortcutInput, ShortcutEventOutput, KeyboardShortcutsComponent } from "ng-keyboard-shortcuts";

//import { Cus_vendor} from '../../services/model';



@Component({
  selector: 'app-dash-office',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss']
})
export class OfficeDashboardComponent implements OnInit {



  public columns_customer: Columns[];


  running_job_count :number = 0;
  completed_job_count : number = 0;
  registered_cus_count : number = 0;
  _option : number = 0;
  CusId : number = 0;
  line_flag : number = 0;



  public data_customer = [];



  public configuration: Config;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {


     this.customers_list();
    //  this.vendors_list();
    //  this.assets_list();


    this.columns_customer = [
      { key: 'customerName', title: 'Name' },
      { key: 'address', title: 'Address' },
      { key: 'mob1', title: 'Contact No.' },
      { key: 'email', title: 'Email' },
      { key: 'gst_no', title: 'Gst No' },
    ];



    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;

  }

  logout()
  {
    localStorage.removeItem('token');
    this.ps.flushPermissions();
    this.router.navigate(['login']);
  }




  ngAfterViewInit(): void {






}


add_customer()
{
  this._option = 1
}
update_customer()
{
  this._option = 2
}

cust_view()
{
  this.line_flag = 1;
}

add_new_job()
{
  this._option = 3 ;
}
update_job()
{

}

view_job()
{

}

completed_view()
{

}


customers_list() {
   this.api.customers_list().subscribe((data:any) => {  this.data_customer = data; this.registered_cus_count=data.length; console.log('cus',this.data_customer) });
  }
// vendors_list() {
//   this.api.cus_vendor_list_filter_vendor_only().subscribe((data:any) => {  this.data_vendors = data; this.vendorsno=data.length; console.log('vendors',this.data_vendors) });
//   }

//    assets_list() {
//    this.api.asset_listZ.subscribe((data:any) => {  this.data_assets = data; this.assetsno=data.length; });
//     }


//   reset_cus_(ev:any)
//   {
//    if(ev == true)
//     {
//       this.api.cus_vendors_list_z();
//       this.customers_list();
//       this.vendors_list();
//     }
//   }

//   reset_product_list(ev:any)
//   {
//    if(ev == true)
//     {
//       this.api.assets_list_z();
//       this.assets_list();

//     }
//   }
















  onEvent_customer(event) {
    console.log('clickevent',event);
     if(event.event==='onClick')
    {
      this.api.showModal = 'block';

    }


  }


  onEvent_vendor(event) {
    console.log('clickevent',event);
  }




  hide() {
    this.api.showModal = 'none';
    this.api.displayModal  = 'none';
  }
  customer_table(e: any) {
    console.log('addcustomerevent',e);

    if(e == true)
      {
       // this.customers_list();
      }

  }

  assets_table(e: any) {
    console.log(e);

    if(e == true)
      {
        //this.assets_list();
      }

  }

 // @ViewChild(KeyboardShortcutsComponent) public keyboard: KeyboardShortcutsComponent;


}
