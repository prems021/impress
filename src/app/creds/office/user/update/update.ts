import { Component , OnInit,EventEmitter, Output,Input,OnChanges,
  SimpleChanges} from '@angular/core';
import { FormBuilder,Validators, FormGroup , FormControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update.html',
  styleUrls: ['./update.scss']
})
export class Customer_UpdateComponent implements OnInit {

  custform: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  @Output() datachange = new EventEmitter<any>();
  @Input('custid') customer_id: number;


  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.custform = this.formBuilder.group({
      customerName: ['', [Validators.required,Validators.minLength(3)]],
      address: ['', [Validators.required,Validators.minLength(3)]],
      email: [''],
      mob1: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      mob2: [''],
      gst_no: ['']
    });
   // this.postCust();
  }

  ngOnChanges(changes: SimpleChanges) {
  //  this.get_customer_by_id();
  }

  postCust() {
    // this.apiService.getCustr(this.data1.cid.toString()).subscribe((user: any) => {
    //   console.log('user',user);
    //   this.custform.get('customerName').setValue(user['msg']['customerName']);
    //   this.custform.get('address').setValue(user['msg']['address']);
    //   this.custform.get('email').setValue(user['msg']['email']);
    //   this.custform.get('mob1').setValue(user['msg']['mob1']);
    //   this.custform.get('mob2').setValue(user['msg']['mob2']);
    //   this.custform.get('gst_no').setValue(user['msg']['gst_no']);
    // });
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 2000,
    });
  }

  updatecust() {
    // if (this.custform.valid) {
    //   this.customer = {
    //     cid: this.data1.cid,
    //     customerName: this.custform.get('customerName').value,
    //     address: this.custform.get('address').value,
    //     email: this.custform.get('email').value,
    //     mob1: this.custform.get('mob1').value,
    //     mob2: this.custform.get('mob2').value,
    //     gst_no: this.custform.get('gst_no').value
    //   };
    //   this.apiService.upCustomer(this.customer).subscribe((cust: any) => {

    //     if (cust.success == true) {
    //       this.openSnackbar('Customer Updated', 'Ok');
    //       this.dialogRef.close();
    //     } else {
    //       alert(cust.msg);
    //     }
    //   });
    // } else {
    //   alert('Incorrect Customer Details');
    // }
  }

  deletecust()
  {



      // this.customer = {
      //   cid: this.data1.cid,
      //   customerName: this.custform.get('customerName').value,
      //   address: this.custform.get('address').value,
      //   email: this.custform.get('email').value,
      //   mob1: this.custform.get('mob1').value,
      //   mob2: this.custform.get('mob2').value,
      //   gst_no: this.custform.get('gst_no').value
      // };
      // this.apiService.delCustomer(this.customer).subscribe((cust: Customer) => {
      //   console.log(cust)
      //   if (cust['success'] === "true") {
      //     this.openSnackbar('Customer Deleted', '');
      //     this.dialogRef.close();
      //   } else {
      //     alert('Operation Failed');
      //   }
      // });


  }





}
