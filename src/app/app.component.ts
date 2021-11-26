import { Component,OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AppService } from './services/app.service';
import { ApiService } from './services/api.service';
import { Service_worker } from './services/sw.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pro-dashboard-angular';
  user_role:string;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true,
    minDate: new Date()
  }
  constructor(private appService: AppService, private ps:NgxPermissionsService ,
     private rs : Router,public api : ApiService,private Sw_:Service_worker) 
      { 
          Sw_.check_for_update()
          
          if (window.innerWidth < 768) {
            this.api.isMobileResolution = true;
          } else {
            this.api.isMobileResolution = false;
          }
      
      
      }
  ngOnInit()
  {
    this.rs.navigate(['/login'])

   // this.api.cus_vendors_list_z();
   // this.api.assets_list_z();

    // if(localStorage.getItem('token')!=null)
    // {
    //   this.user_role= localStorage.getItem('token');    
    //   this.ps.loadPermissions([this.user_role]);
    //   this.rs.navigate(['/dash'])
    // }
    // else{
    //   this.rs.navigate(['/login'])
    // }
  
    
  }
  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
