
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Work  } from './model';
import {  DatePipe } from '@angular/common';
import { PaperTy , PaperQy , PaperApi , paperinfo_model} from './paper_model';
import { EngineerNa } from './model';
import { numarr } from './paper_model';
import { Addpaper } from './paper_model';
import { GST } from './model';
import { Add_user_Component } from '../user/add/add';
import { Work_size_select } from './model';

@Component({
  selector: 'app-updatework-component',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss'],
})
export class Update_order_Component implements OnInit, AfterViewInit {

  updateworkform: FormGroup;
  upWork: Work;
  fetchpaper: PaperTy[];
  fetch_oth_paper: PaperTy[];
  fetchquality: PaperQy[];
  ordered_paper_list : PaperApi ;
  engineer_list: any[] = [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  machines: string[] = [];
  bind = new FormControl();
  bindlist: string[] = ['Folding', 'Stitching', 'Perfect', 'Center Pin', 'Padmaking', 'Shringwrap', 'Creasing', 'Numbering'];
  items: FormArray;
  dataarray: any[];
  resultarray: any[];
  custId: number;
  num: numarr;
  adpaper: Addpaper;
  show = false;
  showlamin : boolean = false;
  buttonName = 'Show';
  hide: any;
  btnColor = 'red';
  bindColor = 'red';
  laminColor = 'red';
  showBind = false;
  bindbutton = 'ShowBind';
  laminbutton = 'ShowBind';
  hideBind: any;
  gstIn: any[];
  checked: any;
  status_flag : number = 0;
  displayedColumns: string[] = ['paper', 'action'];
  lamination : string = '';
  paperinfo_models : paperinfo_model[] = [];
  paperinfo = new MatTableDataSource<any>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  view_option_flag : boolean = false;

  d1: number = 0;
  d2: number = 0;
  d3: number = 0;
  d4: number = 0;
  d5: number = 0;
  d6: number = 0;
  cus_updation : boolean = false
  gst_percentage: number = 0
  total_amt: number = 0;
  unit_amt: number = 0;
  discount_amt: number = 0;
  travel_amt: number = 0;
  cess_percentage: number = 0;
  customer_source: any[] = [];
  matts: string[] = ['Matt', 'Glossy', 'Knurling','Uv Coating','Foiling','Empossing','None'];




  Work_size_ary : Work_size_select[] = [{id: 1, work_size_select: "Single Dy (570*435) mm"},{id: 2,work_size_select: "Dy half (280*435) mm"},{id: 3,work_size_select: "Dy 1/4 (215*280) mm"},
  {id: 4, work_size_select: "Dy 1/8 (140*215) mm"},{id: 5,work_size_select: "Dy 1/16 (105*140) mm"},{id: 6,work_size_select: "Double Crown (720*495) mm"},
  {id: 1, work_size_select: "Single Crown (360*495) mm"},{id: 2,work_size_select: "Crown Half (245*360) mm"},{id: 3,work_size_select: "Crown 1/4 (180*245) mm"},
  {id: 3,work_size_select: "Crown 1/8 (120*180) mm"},{id: 3,work_size_select: "Crown 1/16 (90*120) mm"}];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private snackBar: MatSnackBar, private router: Router, private datepipe: DatePipe,public dialog: MatDialog) { }

  ngOnInit() {
                this.getpaperType();
                this.load_all_engineers();
                this.load_all_customers();
                this.getGst();
             //   this.getCess();
    this.updateworkform = this.formBuilder.group({
      workNo: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      estimateDate: [''],
      customerName: [{ value: '', disabled: true }, [Validators.required]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }],
      mob1: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mob2: [{ value: '', disabled: true }],
      cid : [0],
      workName: ['', [Validators.required]],
      workSize_select : ['', [Validators.required]],
      workSize: [''],
      copies: ['', [Validators.required]],
      typePrinting: ['', [Validators.required]],
      mColor: null,
      sColor: null,
      twoColor: null,
      bandWhite: null,
      cover: null,
      sizecut: [''],
      matt: [''],
      other_lamination: [''],
      printPlace: [''],
      totalAmount: ['', [Validators.required]],
      engineer: ['', [Validators.required]],
      folding: false,
      stitching: false,
      perfect: false,
      centerPin: false,
      padmaking: false,
      shringwrap:false,
      creasing: false,
      numbering: false,
      spiral_binding : false,
      case_binding : false,
      hard_binding : false,
      tin_mounting : false,
      shring_wrap_bundle_each : false,
      hole_punch : false,
      flush_cutting : false,
      none_binding : false,
      other_paper: [''],
      other_binding: [''],
      travel_amt: [''],
      tax: [''],
      Gst_id : 0 ,
      Gst_type:this.formBuilder.group({
        id : 0,
        Gst_type: [''],
        Gst_value: 0
      }),
      unitAmount: ['', [Validators.required]],
      cess: [''],
      discount: [''],
      taxAmount: [''],
      grand_amt: [''],
      outsource: [''],
      addform: this.formBuilder.group({
        paper: ['']
      }),
    },
      { validator: this.dateLessThan('orderDate', 'estimateDate') });
     this.getWork();

  }

  getGst() {
    this.apiService.fetchGst().subscribe((info: GST[]) => {
      this.gstIn = info['data'];
      console.log('this.gstIn',this.gstIn);
    });
  }



  ngAfterViewInit() {


  }

  openg() {

    console.log('Xttt ');
    const dialogRef = this.dialog.open(Add_user_Component, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.load_all_customers();
    });
  }





load_all_customers() {
  this.apiService.fetchCustomer().subscribe((customerData: any) => {
    this.customer_source = customerData, console.log('data', this.customer_source)
  }, (err: any) => console.error(err),);

}


  gear_papers(paper_list : any)
  {
    console.log('paper _ list',paper_list);
    this.paperinfo.data = paper_list


  }




  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Wrong Estimate date"
        };
      }
      return {};
    }
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 5000,
      panelClass: ['blue-snackbar']
    });
  }

  addpaper(): FormGroup {
    return this.formBuilder.group({
      paper: ['', [Validators.required]]
    });
  }

  setlangfun() {
      this.paperarray.push(this.addpaper());
  }

  removelangfun(index) {
    this.paperarray.removeAt(index);
  }

  get paperarray() {
    return <FormArray>this.updateworkform.get('other');
  }


  my_search_Callback(ev: any) {
    this.updateworkform.patchValue({ customerName: ev.customerName, address: ev.address, email: ev.email, mob1: ev.mob1, cid: ev.id })
    }

  edit_customer()
  {
    this.cus_updation = !this.cus_updation;
  }



  load_all_engineers() {
    this.apiService.get_all_Engineers().subscribe((engineerData: any) => {
      this.engineer_list = engineerData.data, console.log('data', this.engineer_list)
    }, (err: any) => console.error(err),

    );

  }

  getpaperType() {
    this.apiService.getpaperType().subscribe((result: PaperTy[]) => {
      this.fetchpaper = result['data'];
      //this.fetch_oth_paper = result['other'];
      console.log('result this.fetchpaper  ',this.fetchpaper)
    });
  }



  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Show';
    }
  }

  change() {
    if (this.btnColor === 'aqua') {
      this.btnColor = 'red';
    } else {
      this.btnColor = 'aqua';
    }
  }

  toggleBind() {
    this.showBind = !this.showBind;
    if (this.showBind) {
      this.bindbutton = 'HideBind';
    } else {
      this.bindbutton = 'ShowBind';
    }
  }

  toggle_lamination()
  {
    this.showlamin = !this.showlamin;

  }

  changeBind() {
    if (this.bindColor === 'aqua') {
      this.bindColor = 'red';
    } else {
      this.bindColor = 'aqua';
    }
  }

  change_lamination()
  {
    if (this.laminColor === 'aqua') {
      this.laminColor = 'red';
    } else {
      this.laminColor = 'aqua';
    }
  }

  change_tax(ev: any) {

    if (ev.value === 'in') {
      this.updateworkform.controls.cess.disable();
      this.updateworkform.controls.unitAmount.disable();
      this.updateworkform.controls.taxAmount.disable();
      this.updateworkform.controls.grand_amt.disable();
      this.updateworkform.controls.totalAmount.enable();
    }
    else if (ev.value === 'ex') {
      this.updateworkform.controls.taxAmount.disable();
      this.updateworkform.controls.grand_amt.disable();
      this.updateworkform.controls.cess.disable();
      this.updateworkform.controls.totalAmount.disable();
      this.updateworkform.controls.unitAmount.enable();

    }
  }

  calcuateGst_new() {



    if (this.updateworkform.controls.tax.value === 'in') {

      this.total_amt = this.updateworkform.controls.totalAmount.value;
      this.discount_amt = this.updateworkform.controls.discount.value;
      this.travel_amt = this.updateworkform.controls.travel_amt.value;



      this.d1 = ((this.total_amt - this.discount_amt) * 100);
      this.d2 = ((this.gst_percentage - 0) + 100);
      this.d3 = this.d1 / this.d2;
      this.d3 = Math.round(this.d3 * 100) / 100
      this.updateworkform.patchValue({ unitAmount: this.d3 });


      this.d4 = (this.total_amt - this.discount_amt) - this.d3;
      this.d4 = Math.round(this.d4 * 100) / 100;
      this.updateworkform.patchValue({ taxAmount: this.d4 });

      if (this.gst_percentage > 5) {
        this.d5 = (this.d3 * this.cess_percentage) / 100;
        this.d5 = Math.round(this.d5 * 100) / 100;
        this.updateworkform.patchValue({ cess: this.d5 });
      }

      this.d6 = this.d3 + this.d4 + this.d5 + this.travel_amt;
      this.updateworkform.patchValue({ grand_amt: this.d6 });





    }

    else if (this.updateworkform.controls.tax.value === 'ex') {


      this.unit_amt = this.updateworkform.controls.unitAmount.value;
      this.discount_amt = this.updateworkform.controls.discount.value;
      this.travel_amt = this.updateworkform.controls.travel_amt.value;


      if (this.gst_percentage > 5) {
        this.d1 = (this.unit_amt * this.cess_percentage) / 100;
        this.d1 = Math.round(this.d1 * 100) / 100;
        this.updateworkform.patchValue({ cess: this.d1 });
      }

      this.d2 = (this.unit_amt * this.gst_percentage) / 100;
      this.d2 = Math.round(this.d2 * 100) / 100;
      this.updateworkform.patchValue({ taxAmount: this.d2 });
      this.d3 = (this.unit_amt - 0) + this.d1 + this.d2;
      this.d3 = Math.round(this.d3 * 100) / 100;
      this.updateworkform.patchValue({ totalAmount: this.d3 });
      this.d4 = this.d3 - this.discount_amt + this.travel_amt;
      this.updateworkform.patchValue({ grand_amt: this.d4 });


    }


  }

//   getCess() {
//     this.apiService.cessData().subscribe((result: any) => {
//       this.cess_percentage = result[0].cess_percent;
//     })
//   }


  newpaper() {



     this.updateworkform.controls.addform.get('paper');

    if (this.updateworkform.controls.addform.get('paper').value === '') {
      alert('Please Add Paper');
    } else {
      if (this.updateworkform.get('addform').valid) {
        this.adpaper = {
          id: null,
          Wid: this.apiService.work_order_id,
          paper: this.updateworkform.controls.addform.get('paper').value,
          other_paper : null
        };
        this.apiService.newPaper(this.adpaper).subscribe((result: any) => {
            if(result.success == false)
             {
              alert(result.msg);
             }
             else
             {
              this.openSnackbar('Paper Inserted', 'ok');
               this.updated_paper_list_on_edit_after_activity();
             }


        });
      }
    }


  }

  newpaperout() {

    console.log('inside...')

    if (this.updateworkform.get('other_paper').value === '' || null) {
      alert('Please Enter Paper Type');
    } else {

        this.adpaper = {
          id: null,
          Wid: this.apiService.work_order_id,
          paper : '',
          other_paper: this.updateworkform.get('other_paper').value
        };
        this.apiService.newPaperoutstock(this.adpaper).subscribe((result: Addpaper) => {
          if (result) {
            this.openSnackbar('Paper Inserted', 'ok');

            this.updated_paper_list_on_edit_after_activity();
            this.updateworkform.get('other_paper').reset();
          }
        });

    }
  }

  closeButton() {
   this.router.navigate(['/Pressoffice/view'])
  }

  getWork() {
    this.apiService.fetchWork(this.apiService.work_order_id.toString()).subscribe((result: any) => {
      console.log('indivu',result);
      this.gear_papers(result.paper_dets)
      this.make_data(result)
    })
  }
  make_data(result : any)
  {
      this.updateworkform.get('workNo').setValue(result['wo_dets']['workNo']);
      this.updateworkform.get('workName').setValue(result['wo_dets']['workName']);
      this.updateworkform.get('customerName').setValue(result['cus_dets']['customerName']);
      this.updateworkform.get('address').setValue(result['cus_dets']['address']);
      this.updateworkform.get('email').setValue(result['cus_dets']['email']);
      this.updateworkform.get('mob1').setValue(result['cus_dets']['mob1']);
      this.updateworkform.get('mob2').setValue(result['cus_dets']['mob2']);
       this.updateworkform.get('engineer').setValue(result['wo_dets']['engineer']);
       this.updateworkform.get('workSize').setValue(result['wo_dets']['workSize']);
       this.updateworkform.get('workSize_select').setValue(result['wo_dets']['workSize_select']);


       this.updateworkform.get('copies').setValue(result['wo_dets']['copies']);
       this.updateworkform.get('typePrinting').setValue(result['wo_dets']['typePrinting']);
      this.updateworkform.get('mColor').setValue(result['wo_dets']['mColor']);
      this.updateworkform.get('twoColor').setValue(result['wo_dets']['twoColor']);
      this.updateworkform.get('sColor').setValue(result['wo_dets']['sColor']);
      this.updateworkform.get('cid').setValue(result['cus_dets']['id']);
      this.updateworkform.get('bandWhite').setValue(result['wo_dets']['bandWhite']);
      this.updateworkform.get('cover').setValue(result['wo_dets']['cover']);
      this.updateworkform.get('orderDate').setValue(result['wo_dets']['orderDate']);
      this.updateworkform.get('estimateDate').setValue(result['wo_dets']['estimateDate']);
      this.updateworkform.get('perfect').setValue(result['wo_dets']['perfect']);
      this.updateworkform.get('folding').setValue(result['wo_dets']['folding']);
      this.updateworkform.get('stitching').setValue(result['wo_dets']['stitching']);
      this.updateworkform.get('centerPin').setValue(result['wo_dets']['centerPin']);
      this.updateworkform.get('padmaking').setValue(result['wo_dets']['padmaking']);
      this.updateworkform.get('shringwrap').setValue(result['wo_dets']['shringwrap']);
      this.updateworkform.get('creasing').setValue(result['wo_dets']['creasing']);
      this.updateworkform.get('numbering').setValue(result['wo_dets']['numbering']);


      if(result.wo_dets.other_lamination_flag === false)
      {
        this.updateworkform.get('matt').setValue(result['wo_dets']['lamination']);
        this.updateworkform.controls.other_lamination.setValue(null)
      }
      else
      {
          this.updateworkform.controls.matt.setValue(null)
        this.updateworkform.controls.other_lamination.setValue(result['wo_dets']['lamination'])
      }
        this.updateworkform.get('other_binding').setValue(result['wo_dets']['other_binding']);
        this.showBind = result['wo_dets']['other_binding_flag'];
        this.showlamin = result['wo_dets']['other_lamination_flag'];
      this.updateworkform.get('travel_amt').setValue(result['invo_dets']['travel_amt']);
      this.updateworkform.get('taxAmount').setValue(result['invo_dets']['taxAmount']);
      this.updateworkform.get('grand_amt').setValue(result['invo_dets']['Grand_total']);
      this.updateworkform.get('totalAmount').setValue(result['invo_dets']['totalAmount']);
      this.updateworkform.get('tax').setValue(result['invo_dets']['tax']);

      this.updateworkform.get('cess').setValue(result['invo_dets']['cess']);
      this.updateworkform.get('discount').setValue(result['invo_dets']['discount']);
      this.updateworkform.get('unitAmount').setValue(result['invo_dets']['unitAmount']);
      this.status_flag = result.wo_dets.status_flag;
      this.updateworkform.get('outsource').setValue(result.wo_dets.outsource);
      this.updateworkform.patchValue({Gst_id : result.invo_dets.gst_table.id});
      this.updateworkform.patchValue({Gst_type:result.invo_dets.gst_table});
      console.log('this.updah', this.updateworkform.controls.Gst_type.get('Gst_type').value);


      if (result['invo_dets']['tax'] === 'in') {
        this.updateworkform.controls.cess.disable();
        this.updateworkform.controls.unitAmount.disable();
        this.updateworkform.controls.taxAmount.disable();
        this.updateworkform.controls.grand_amt.disable();
        this.updateworkform.controls.totalAmount.enable();
      }
      else if (result['invo_dets']['tax'] === 'ex') {
        this.updateworkform.controls.taxAmount.disable();
        this.updateworkform.controls.grand_amt.disable();
        this.updateworkform.controls.cess.disable();
        this.updateworkform.controls.totalAmount.disable();
        this.updateworkform.controls.unitAmount.enable();

      }



  }




  change_gst_on(ev:any)
  {

    this.gst_percentage =  ev.value.Gst_value;
    this.calcuateGst_new();
    this.updateworkform.patchValue({Gst_id : ev.value.id})
  }




delay()
{
 this.view_option_flag = true;
}







  openDelete(pid: number) {

    this.num = {
      id: pid,
      Wid: this.apiService.work_order_id
    };
    this.apiService.delete_on_edit_paper(this.num).subscribe(paper => {
      if (paper['success'] === true) {
        this.openSnackbar('Paper Deleted', 'Ok');
        this.updated_paper_list_on_edit_after_activity();
      }
    });
  }

  updated_paper_list_on_edit_after_activity()
  {
    this.apiService.updated_paper_list_on_edit_after_activity(this.apiService.work_order_id).subscribe(paper => {
      this.paperinfo.data = paper.data
    })


  }



  read()
  {
    console.log('val',this.updateworkform.getRawValue());
  }

  cancelwork()
  {
    if(confirm("Are you sure to Cancel work")) {

      this.apiService.cancelWork(this.apiService.work_order_id).subscribe((result: any) => {
        console.log("Iy here",result);
      })
    }
    else{
      console.log("Iy here");
    }
  }


  updatework_finally() {

    if(this.showlamin === false)
    {
      this.lamination = this.updateworkform.get('matt').value
    }
    else
    {
      this.lamination = this.updateworkform.get('other_lamination').value
    }




      this.upWork = {
        user_role :  localStorage.getItem('user_role'),
        Wid: this.apiService.work_order_id,
        workNo: this.updateworkform.get('workNo').value,
        workName: this.updateworkform.get('workName').value,
        cid: this.updateworkform.controls.cid.value,
        customerName: this.updateworkform.get('customerName').value,
        address: this.updateworkform.get('address').value,
        email: this.updateworkform.get('email').value,
        mob1: this.updateworkform.get('mob1').value,
        mob2: this.updateworkform.get('mob2').value,
        engineer: this.updateworkform.get('engineer').value,
        workSize: this.updateworkform.get('workSize').value,
        workSize_select :  this.updateworkform.get('workSize_select').value,
        copies: this.updateworkform.get('copies').value,
        typePrinting: this.updateworkform.get('typePrinting').value,
        mColor: this.updateworkform.get('mColor').value,
        twoColor: this.updateworkform.get('twoColor').value,
        sColor: this.updateworkform.get('sColor').value,
        bandWhite: this.updateworkform.get('bandWhite').value,
        cover: this.updateworkform.get('cover').value,
        paper: null,
        orderDate: this.datepipe.transform(this.updateworkform.get('orderDate').value, 'yyyy-MM-dd'),
        estimateDate: this.datepipe.transform(this.updateworkform.get('estimateDate').value, 'yyyy-MM-dd'),
        lamination: this.lamination,
        other_lamination_flag : this.showlamin,
        printPlace: this.updateworkform.get('printPlace').value,
        folding: this.updateworkform.get('folding').value,
        stitching: this.updateworkform.get('stitching').value,
        perfect: this.updateworkform.get('perfect').value,
        centerPin: this.updateworkform.get('centerPin').value,
        padmaking: this.updateworkform.get('padmaking').value,
        shringwrap: this.updateworkform.get('shringwrap').value,
        creasing: this.updateworkform.get('creasing').value,
        numbering: this.updateworkform.get('numbering').value,
        other_binding: this.updateworkform.get('other_binding').value,
        other_paper: this.updateworkform.get('other_paper').value,
        totalAmount: this.updateworkform.get('totalAmount').value,
        travel_amt: this.updateworkform.get('travel_amt').value,
        tax: this.updateworkform.get('tax').value,
        Gst_id : this.updateworkform.get('Gst_id').value,
        Gst_type: this.updateworkform.get('Gst_type').value,
        unitAmount: this.updateworkform.get('unitAmount').value,
        cess: this.updateworkform.get('cess').value,
        discount: this.updateworkform.get('discount').value,
        outsource: this.updateworkform.get('outsource').value,
        grand_amt : this.updateworkform.get('grand_amt').value,
        status_flag : 10
      };





      this.apiService.updateWork(this.upWork).subscribe((result: any) => {

        if (result['success']) {
        //  this.dialogRef.close(this.upWork);
          setTimeout (() => {
                             alert('Work  Updated');
                             window.print();
                            }, 1000);
                         } else {
                                alert(result.msg);
                               }
      });



  }

  updatework_forward()
  {

    if(this.showlamin === false)
    {
      this.lamination = this.updateworkform.get('matt').value
    }
    else
    {
      this.lamination = this.updateworkform.get('other_lamination').value
    }


      this.upWork = {
        user_role :  localStorage.getItem('user_role'),
        Wid: this.apiService.work_order_id,
        workNo: this.updateworkform.get('workNo').value,
        workName: this.updateworkform.get('workName').value,
        cid: this.updateworkform.controls.cid.value,
        customerName: this.updateworkform.get('customerName').value,
        address: this.updateworkform.get('address').value,
        email: this.updateworkform.get('email').value,
        mob1: this.updateworkform.get('mob1').value,
        mob2: this.updateworkform.get('mob2').value,
        engineer: this.updateworkform.get('engineer').value,
        workSize: this.updateworkform.get('workSize').value,
        workSize_select : this.updateworkform.get('workSize_select').value,
        copies: this.updateworkform.get('copies').value,
        typePrinting: this.updateworkform.get('typePrinting').value,
        mColor: this.updateworkform.get('mColor').value,
        twoColor: this.updateworkform.get('twoColor').value,
        sColor: this.updateworkform.get('sColor').value,
        bandWhite: this.updateworkform.get('bandWhite').value,
        cover: this.updateworkform.get('cover').value,
        paper: null,
        orderDate: this.datepipe.transform(this.updateworkform.get('orderDate').value, 'yyyy-MM-dd'),
        estimateDate: this.datepipe.transform(this.updateworkform.get('estimateDate').value, 'yyyy-MM-dd'),
        lamination: this.lamination,
        other_lamination_flag : this.showlamin,
        printPlace: this.updateworkform.get('printPlace').value,
        folding: this.updateworkform.get('folding').value,
        stitching: this.updateworkform.get('stitching').value,
        perfect: this.updateworkform.get('perfect').value,
        centerPin: this.updateworkform.get('centerPin').value,
        padmaking: this.updateworkform.get('padmaking').value,
        shringwrap: this.updateworkform.get('shringwrap').value,
        creasing: this.updateworkform.get('creasing').value,
        numbering: this.updateworkform.get('numbering').value,
        other_binding: this.updateworkform.get('other_binding').value,
        other_paper: this.updateworkform.get('other_paper').value,
        totalAmount: this.updateworkform.get('totalAmount').value,
        travel_amt: this.updateworkform.get('travel_amt').value,
        tax: this.updateworkform.get('tax').value,
        Gst_id : this.updateworkform.get('Gst_id').value,
        Gst_type: this.updateworkform.get('Gst_type').value,
        unitAmount: this.updateworkform.get('unitAmount').value,
        cess: this.updateworkform.get('cess').value,
        discount: this.updateworkform.get('discount').value,
        outsource: this.updateworkform.get('outsource').value,
        grand_amt : this.updateworkform.get('grand_amt').value,
        status_flag : 10
      };



      this.apiService.updateWork_repost(this.upWork).subscribe((result: any) => {

        if (result['success']) {
         // this.dialogRef.close(this.upWork);
          setTimeout (() => {
                             alert('Work  Updated');
                             window.print();
                            }, 1000);
                         } else {
                                alert(result.msg);
                               }
      });

  }

}

