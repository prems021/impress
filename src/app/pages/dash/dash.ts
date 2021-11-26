
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
// import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
//import { ShortcutInput, ShortcutEventOutput, KeyboardShortcutsComponent } from "ng-keyboard-shortcuts";

//import { Cus_vendor} from '../../services/model';

export enum AllowIn {
  Textarea = 'TEXTAREA',
  Input = 'INPUT',
  Select = "SELECT"
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss']
})
export class DashboardComponent implements OnInit {



  //shortcuts: ShortcutInput[] = [];


  public columns_customer: Columns[];
  public columns_assets : Columns[];

  customersno:number=0;
  vendorsno : number = 0;
  assetsno : number=0;
  salesmanno:number=0;
  vendors_no:number=0;



  public data_customer = [];

  public data_assets = [];

  public data_vendors = [];

  public cuccuc : any;

  flag: number = 0;
  _addmodal = 0;
  CusId: any;
  SalesId: any;
  Sales_Name: any;
  Sales_Phone: any;
  WId: any;
  Worker_Name: any;
  Worker_Phone: any;
  _modal = 0;
  JobId: any;
  Jobtype: any;
  cus_update_flag : boolean = false;
  vendor_update_flag :  boolean = false;
  data_customerZ : any;
  asset_listZ : any;
  public configuration: Config;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {


    //  this.customers_list();
    //  this.vendors_list();
    //  this.assets_list();


    this.columns_customer = [
      { key: 'name', title: 'Name' },
      { key: 'street', title: 'Address' },
      { key: 'ph', title: 'Contact No.' },
      { key: 'mob', title: 'Mobile No.' },
    ];

    this.columns_assets = [
      { key: 'product_name', title: 'Name' },
      { key: 'bar_code', title: 'Code' },
      { key: 'tax_rate', title: 'Tax' },
      { key: 'rate', title: 'Rate' },
      { key: 'mrp', title: 'MRP' },
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





// customers_list() {
//    this.api.cus_vendor_list_filter_cus_only().subscribe((data:any) => {  this.data_customer = data; this.customersno=data.length; console.log('cus',this.data_customer) });
//   }
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


  add_customer()
  {
    // this.customers_list();
     this.cus_update_flag = false;
     this.api.displayModal  = 'block';
     this._addmodal = 1;

  }
  update_customer()
  {
    this.cus_update_flag = true;
    this.api.displayModal  = 'block';
    this._addmodal = 1;
   }

   add_vendor() {
    this.vendor_update_flag = false;
    this.api.displayModal  = 'block';
    this._addmodal = 2;
  }

  update_vendor()
  {
    this.vendor_update_flag = true;
    this.api.displayModal  = 'block';
    this._addmodal = 2;
  }









  cust_view() {
    this.flag = 1;
    //this.customers_list();
  }
  vendor_view() {
    this.flag = 2;
  }
  asset_view() {
    this.flag = 3;
  }

  /*****************GET MODAL************************** */


  addjob() {
    this.api.displayModal  = 'block';
    this._addmodal = 2;
  }
  add_product() {
    this.api.displayModal  = 'block';
    this._addmodal = 3;
  }



  add_assets()
  {
    this.cus_update_flag = true;
    this.api.displayModal  = 'block';
    this._addmodal = 3;
  }






  update_assets()
  {
    this.api.displayModal  = 'block';
    this._addmodal = 31;
  }



  onEvent_customer(event) {
    console.log('clickevent',event);
     if(event.event==='onClick')
    {
      this.api.showModal = 'block';
      this.CusId = event.value.row.id;
      this._modal = 1;
    }

    // alert(this.CusId);
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
