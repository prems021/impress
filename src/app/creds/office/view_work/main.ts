


import {  Component, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';




@Component({
  selector: 'app-office-view-work',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Office_View_work_main implements OnInit {

 

  public columns_works: Columns[]; 
  flag : number = 0;
  work_count  : number = 0;
  public data_works = [];
  public configuration: Config;
  e_var : any;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {


     this.work_list();  

    this.columns_works = [
      { key: 'workNo', title: 'Job No' },
      { key: 'workName', title: 'workName' },
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



update_job()
{

}

view_job()
{

}

completed_view()
{

}


work_list() {
   this.api.getWorks().subscribe((data:any) => {  this.data_works = data; this.flag=1 ; this.work_count=data.length; console.log('works',this.data_works) });
  }

  view_change(e:any)
  {
    console.log('e',e)
  }















  onEvent_customer(event) {
  
     if(event.event==='onClick')
    {
      console.log('clickevent',event);
      this.flag = 3;
       if(event.value.row.Wid  > 0)
       {
         this.e_var = event.value.row
       }

    }
    console.log('clickevent',event.value.row.Wid);
    


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
