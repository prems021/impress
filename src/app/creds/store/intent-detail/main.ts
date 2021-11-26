import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl,FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
// import { Paper } from 'src/app/Models/paper';
// import { adSheetNo, Cmpny, Orderpaper } from '../add-sheet/add-sheet.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface Company_Det {
  id: number;
  Company_name: string;
}

@Component({
  selector: 'app-view-intent-dets',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class View_intent_details_Component implements OnInit {

    paperform: FormGroup;
    paperdata: any;
    intentdata: any;

    l_dets_view : boolean = false;


    stat: boolean = false;
    abc: string;
    comp: any;
    companies : any [][] =  [];

    work_form_ary : any[] = [];

    workform: FormGroup;
    is_com_loaded : boolean[] = []

    push_disabled : boolean = false

   poster : any;

   Work_dets_e = new FormGroup({
    Wid: new FormControl(0),
    REMARKS: new FormControl(''),
    labour_dets: new FormArray([
    ]),
  });


    constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,
      private _httpClient: HttpClient, private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<View_intent_details_Component>, @Inject(MAT_DIALOG_DATA) public data1: any) { }

    ngOnInit() {


      this.getPapertype();
      this.workform = this.formBuilder.group({
        paper_cat_id : ['', [Validators.required]],
        paper_id : [0, [Validators.required]],
        index : [0, [Validators.required]],
        Qty_req : [''],
        R_QTY : [''],
        company : '',
        remark: ['',[Validators.maxLength(140)]],
      });

      this.companies.push([]);
    }


    getPapertype() {
           console.log('this.data1',this.data1);
      this.apiService.get_paper_list_of_selected_intent(this.data1.Wid).subscribe((result: any) => {
      console.log('init',result);
         this.paperdata = result['data'];
         console.log('dataX', this.paperdata)
         this.make_slave_data(this.paperdata)
         this.make_company(this.paperdata);
        });
      }


    make_company(data:any)
    {
      console.log('dataFY',data)
      for(var k=0;k<data.length;k++)
      {
        this.companies.push([]);
        this.workform.patchValue({index:k,paper_cat_id:this.paperdata[k].paper_category_id,paper_id:this.paperdata[k].paper_master_id,Qty_req:this.paperdata[k].quantity});
        this.apiService.get_company_list_of_selected_intent(this.workform.value).subscribe((result: any) => {
          console.log('com+++',result)
          this.make_company_slave(result);
        })

    }
  }

  make_company_slave(data:any)
  {

       while(this.companies[data.index].length > 0)
         {
          this.companies[data.index].pop()
         }
     for(var y=0;y<data.data.length;y++)
     {
        this.companies[data.index].push(data.data[y].company_list)
     }



  }





    make_slave_data(data:any)
    {

      const labour_dets_ = this.Work_dets_e.get('labour_dets') as FormArray

      while (labour_dets_.length !== 0) {
        labour_dets_.removeAt(0)
      }




      for(var i=0;i<data.length;i++)
      {

       if(data[i].Company_assigned_id == null)
        {
          this.addfb_init(data[i].id,data[i].Paper_master.Papertype +  data[i].Paper_master.Size + data[i].Paper_master.Gsm,data[i].paper_category_id,data[i].quantity,0,data[i].white_flag,null,data[i].qty_released_from_store);
        }
        else
        {
          this.addfb_init(data[i].id,data[i].Paper_master.Papertype +  data[i].Paper_master.Size + data[i].Paper_master.Gsm,data[i].paper_category_id,data[i].quantity,0,data[i].white_flag,data[i].company_list.Company_name,data[i].qty_released_from_store);
        }



      }
      this.l_dets_view = true;


      console.log('final',this.Work_dets_e.value);
    }

    openSnackbar(msg: string, btn: string) {
      this.snackBar.open(msg, btn, {
        duration: 5000,
        panelClass: ['blue-snackbar']
      });
    }


    private make_new_labour_dets(id:number,pn:string,pc:number,qr:number,com:number,re:number,ca:string,r_qty:number): FormGroup {
      return new FormGroup({
        ID :  new FormControl(id),
        PAPER_NAME: new FormControl(pn),
        PAPER_CATEGORY: new FormControl(pc),
        QTY_REQ : new FormControl(qr),
        R_QTY : new FormControl(r_qty),
        COMPANY : new FormControl(com),
        STATUS_FLAG : new FormControl(re),
        COMPANY_ASSIAGNED : new FormControl(ca)
      })
    }


    addfb_init(id:number,p_n:string,p_c:number,q_r:number,com_:number,re:number,ca:string,r_qty:number)
    {
     const aar =   this.return_labour();
     aar.push(this.make_new_labour_dets(id,p_n,p_c,q_r,com_,re,ca,r_qty));
    }

    reled()
    {
      this.openSnackbar('Paper Relesed from stock', 'Ok');
    }



    make_com_list(com:any)
    {

       while(this.companies[com.index].length > 0)
       {
        this.companies[com.index].pop()
       }


      for(var y=0;y<com.data.length;y++)
      {
        this.companies[com.index].push(com.data[y].company_list.Company_name)
      }

      this.is_com_loaded[com.index] = true
    }


    get_selection(e:any)
    {

        this.work_form_ary[this.workform.controls.index.value] = this.workform.value;

    }





    return_labour() {
      return this.Work_dets_e.get('labour_dets') as FormArray;
    }



    closeFunction() {
      this.dialogRef.close();
    }

    update_data(i:number)
    {

      const labour_dets_ = this.Work_dets_e.get('labour_dets') as FormArray
        if(labour_dets_.controls[i].value.COMPANY != 0)
        {

                   if(labour_dets_.controls[i].value.R_QTY <  labour_dets_.controls[i].value.QTY_REQ )
                   {
                    alert('Please Select a Value greater than equal to requested qty and try Again')
                   }

                     else {

                      this.poster = {
                                  id : labour_dets_.controls[i].value.ID,
                                  company_name : labour_dets_.controls[i].value.COMPANY_ASSIAGNED,
                                  company_id : labour_dets_.controls[i].value.COMPANY,
                                  Qty_released : labour_dets_.controls[i].value.R_QTY
                              };

                              this.apiService.relese_paper_from_store(this.poster).subscribe((result: any) => {
                                console.log('paper_replay',result);
                                if(result.success == true)
                                {
                                  this.openSnackbar('Paper Relesed from stock', 'Ok');
                                  this.getPapertype();
                                }
                                else
                                {
                                  this.openSnackbar(result.msg, 'Ok');
                                }
                              })

                            }

        }

        else
        {
            alert('Please Select a company, If company not listed,  Add stock and try Again')
        }

    }

}
