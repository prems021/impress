import { Component, OnInit } from '@angular/core';



import { ApiService } from '../../services/api.service';
import { AppService } from '../../services/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {

  submitted = false;
 

  constructor(
    public appService : AppService,

    public api: ApiService,
   
   
  ) {
   
    }

  ngOnInit(): void {

 

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
