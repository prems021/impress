





import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { View_intent_details_Component } from '../intent-detail/main';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface Intent_i {
    Paper_id: number;
    Papertype: string;
    Gsm: number;
    Size: string;
  }


@Component({
  selector: 'app-active-intents',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Active_intent_Component implements OnInit , AfterViewInit {


    intent_info = new MatTableDataSource<any>();
  m_len = 0;

  view_flag : boolean = false;
  isLoadingResult : boolean = false;

  displayedColumns: string[] = ['index', 'intent_no','intent_date','action','finish'];
  company: any;
  pa : string;

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private apiService:ApiService ,public dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private _httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.intent_info.filter = filterValue.trim().toLowerCase();

    if (this.intent_info.paginator) {
      this.intent_info.paginator.firstPage();
    }
}

  ngAfterViewInit() {
    this.intent_info.paginator = this.paginator;
    this.intent_info.sort = this.sort;
  }

  fetchData() {
    this.isLoadingResult = false;
    this.apiService.get_intent_info_untouched().subscribe((result: any) => {
        this.intent_info.data = result.data;
        console.log('intents  .........',result);


        this.isLoadingResults = true;
      });



  }



  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }




  addpaper() {


  }
  res_(data:any)
  {
    this.openSnackbar(data.msg, '');
    this.fetchData();
  }



  openDialog(id:number)
  {
     console.log('number',id)
     const dialogRef = this.dialog.open(View_intent_details_Component, {
      width: '90%',
      data: { Wid: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  finish(id:any)
  {
    console.log('id',id);
    this.apiService.finish_intent_main(id).subscribe((result: any) => {
      console.log('finish',result)
      this.openSnackbar(result.msg, '');
      this.fetchData();

    })
  }


}
