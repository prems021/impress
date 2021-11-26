import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap,shareReplay } from 'rxjs/operators';
import { User,Work } from './model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {


  private localgetUrl =  'http://localhost:4401/impress-api/get/';
  private localindexUrl =  'http://localhost:4401/impress-api/';
  private nodepostlocalUrl = 'http://localhost:4401/impress-api/post/';







   public isMobileResolution: boolean = false;
   building : number = 0;
   work_order_id : number = 0;


  public post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0,num_to_string:0}




  public navtoken:boolean=false;
  public showModal:string;
  public displayModal:string;
  public edit_mode:boolean=false;




  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.showModal = 'none';
    this.displayModal = 'none';
  }





  loginuser(user: any): Observable<any> {
    let body = JSON.stringify(user);  console.log('body', body);
    return this.http.post(this.nodepostlocalUrl + 'login', body, this.httpOptions).pipe(catchError(this.handleError<any>('loginuser', body)));
  }


  addCustomer(cust: any): Observable<any> {
    let body = JSON.stringify(cust);  console.log('body', body);
    return this.http.post(this.nodepostlocalUrl + 'add-new-cutomer', body, this.httpOptions).pipe(catchError(this.handleError<any>('addCustomer', body)));
   }

   customers_list(): Observable<any> {
    const url = `${this.localindexUrl + 'customers_list'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('customers_list')));
  }


  addnewWork(work: Work[]): Observable<any> {
    let body = JSON.stringify(work);  console.log('body', body);
    return this.http.post(this.nodepostlocalUrl + 'add-new-work', body, this.httpOptions).pipe(catchError(this.handleError<any>('addnewWork', body)));
  }
  getpaperType(): Observable<any> {
    const url = `${this.localindexUrl + 'all_papers_on_master'}`;
    return this.http.get<any>(url ,this.httpOptions).pipe(catchError(this.handleError<any>('getpaperType')));
   }

   fetchGst(): Observable<any> {
    const url = `${this.localindexUrl + 'get_all_gst_details'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('fetchGst')));
  }

  get_all_Engineers(): Observable<any> {
    const url = `${this.localindexUrl + 'get_all_engineers'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_Engineers')));

   }
   fetchCustomer()
   {
     const url = `${this.localindexUrl + 'customers_list'}`;
       return this.http.get<any>(url ,this.httpOptions).pipe(catchError(this.handleError<any>('fetchCustomer')));
   }
   getWorks(): Observable<any> {
    return this.http.get(this.localgetUrl + 'all-front-office-work-new', this.httpOptions)
      .pipe(catchError(this.handleError<any>('getWorks')));
  }

  view_work_details_by_id(id: number): Observable<any> {
    console.log('data',id)
    const url = `${this.localindexUrl + 'view_work_details_by_id'}/${id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('view_work_details_by_id')));
  }







  updateWork_repost(work: Work): Observable<Work> {
    let body = JSON.stringify(work);  console.log('body', body);
    return this.http.post(this.nodepostlocalUrl + 'update-work-and-repost', body, this.httpOptions).pipe(catchError(this.handleError<any>('updateWork', body)));
  }

  updateWork(work: Work): Observable<Work> {
    let body = JSON.stringify(work);  console.log('body', body);
    return this.http.post(this.nodepostlocalUrl + 'update-work', body, this.httpOptions).pipe(catchError(this.handleError<any>('updateWork', body)));
  }

cancelWork(work_no:any)
{
  const url = `${this.localindexUrl + 'cancel_work'}/${work_no}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('cancelWork')));
}

updated_paper_list_on_edit_after_activity(Wid: number): Observable<any> {
  const url = `${this.localindexUrl + 'updated_paper_list_on_edit_after_activity'}/${Wid}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError<any>('updated_paper_list_on_edit_after_activity')));
}

delete_on_edit_paper(nu: any): Observable<string> {
  let body = JSON.stringify(nu); console.log('nu...',body);
  return this.http.post(this.nodepostlocalUrl + 'delete_on_edit_paper', body, this.httpOptions).pipe(catchError(this.handleError<any>('delete_on_edit_paper', body)));
}

fetchWork(Wid: string): Observable<any> {
  const url = `${this.localgetUrl + 'get_a_work_order_details'}/${Wid}`;
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('fetchWork')));
}

newPaperoutstock(pa: any): Observable<any> {
  let body = JSON.stringify(pa);
 console.log('body',body)
   return this.http.post(this.nodepostlocalUrl + 'add-other-paper-on-update-work', body, this.httpOptions).pipe(catchError(this.handleError<any>('newPaperoutstock', body)));
}

newPaper(pa: any): Observable<any> {
  let body = JSON.stringify(pa);  console.log('body', body);
  console.log('paaaa..',body)
  return this.http.post(this.nodepostlocalUrl + 'add-paper-on-update-work', body, this.httpOptions).pipe(catchError(this.handleError<any>('newPaper', body)));

}

 getDesignWorks():  Observable<any> {
  const url = `${this.localindexUrl + 'get_all_dtp_work_list'}`;
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('getDesignWorks')));
}

getDesignWorks_finished():  Observable<any> {
  const url = `${this.localindexUrl + 'get_all_dtp_work_list_finished'}`;
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('getDesignWorks_finished')));
}





// getFinishDtp(sort: string, order: string, page: number, size: number): Observable<any> {
//   const url = `${this.localindexUrl + 'get_all_finished_dtp_works'}`;
//   const requestUrls =  `${url}?sort=${sort}&order=${order}&page=${page + 1}&size=${size}`;
//   return this.http.get<any>(requestUrls);
//   }

  Change_dtp_Status(sta: any): Observable<any> {
    let body = JSON.stringify(sta);    console.log('upcust',body);
    return this.http.post(this.nodepostlocalUrl + 'update-dtp-status', body, this.httpOptions).pipe(catchError(this.handleError<any>('Change_dtp_Status', body)));
   }


  sendtoPlan(work: number): Observable<any> {
    const url = `${this.localindexUrl + 'send-to-plan'}/${work}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('sendtoPlan')));
  }


  get_all_plan_work_list() : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_plan_work_list'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_plan_work_list')));
  }

  get_all_plan_work_list_out() : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_plan_work_list_out'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_plan_work_list_out')));
  }

  get_all_plan_work_list_finished() : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_plan_work_list_finished'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_plan_work_list_finished')));
  }

  get_paper_infos_main_and_sub(w_id:number)
  {

    const url = `${this.localindexUrl + 'get_paper_infos_main_and_sub'}/${w_id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_paper_infos_main_and_sub')));

  }


  assign_location_on_Plan(data:any,id:number)
  {
    const url = `${this.localindexUrl + 'assign_location_on_Plan'}/${id}`;
    let body = JSON.stringify(data);  console.log('body', body);
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.handleError<any>('assign_location_on_Plan', body)));
  }

  add_splits_on_paper(id:number,data:any)
  {
    const url = `${this.localindexUrl + 'add_splits_on_paper'}/${id}`;
    let body = JSON.stringify(data);  console.log('body', body);
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.handleError<any>('add_splits_on_paper', body)));
  }

  remove_splits_on_paper(id:number)
  {

    const url = `${this.localindexUrl + 'remove_splits_on_paper'}/${id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('remove_splits_on_paper')));
  }


  get_avail_splits_on(id:number)
  {
    const url = `${this.localindexUrl + 'get_avail_splits_on'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_avail_splits_on')));
  }

  forward_work_from_plan(id:number)
  {
    const url = `${this.localindexUrl + 'forward_work_from_plan'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('forward_work_from_plan')));
  }
  forward_work_from_plate_set(id:number)
  {
    const url = `${this.localindexUrl + 'forward_work_from_plate_set'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('forward_work_from_plate_set')));
  }

  get_paper_infos_main_and_sub_for_plateset_new_work(wid:number)
  {
    const url = `${this.localindexUrl + 'get_paper_infos_main_and_sub_for_plateset_new_work'}/${wid}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_paper_infos_main_and_sub_for_plateset_new_work')));
  }

  mark_completed_for_plateset_new_work(id:number)
  {
    const url = `${this.localindexUrl + 'mark_completed_for_plateset_new_work'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('mark_completed_for_plateset_new_work')));

  }


  // get_all_plate_work_list() : Observable<any> {
  //   const url = `${this.localindexUrl + 'get_all_plate_work_list'}`;
  //   return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_plate_work_list')));
  // }

  get_all_work_list_b_w(from:number,to:number) :  Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_b_w'}/${from}/${to}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_b_w')));
  }

  get_all_work_list_new_plate_set(): Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_new_plate_set'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_new_plate_set')));
  }

  get_all_work_list_new_plate_set_finished() : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_new_plate_set_finished'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_new_plate_set_finished')));
  }


  get_all_work_list_direct_cutting(id:number): Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_direct_cutting'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_direct_cutting')));
  }

  get_all_work_list_advance_cutting(id:number) : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_advance_cutting'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_advance_cutting')));
  }

  get_all_work_list_cutting_finished(id:number) : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_cutting_finished'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_cutting_finished')));
  }
  get_all_work_list_cutting_final(id:number) : Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_cutting_final'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_cutting_final')));
  }


  forward_work_from_cutting(id:number) : Observable<any> {
    const url = `${this.localindexUrl + 'forward_work_from_cutting'}/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('forward_work_from_cutting ')));
  }

  get_cutting_jobs_for_new_work(wid:number) :  Observable<any> {
    const url = `${this.localindexUrl + 'get_cutting_jobs_for_new_work'}/${wid}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_cutting_jobs_for_new_work ')));
  }





  get_intent_info_untouched(): Observable<any> {
    const url = `${this.localindexUrl + 'get_intent_info_untouched'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_intent_info_untouched')));
  }

  get_intent_info_finished(): Observable<any> {
    const url = `${this.localindexUrl + 'get_intent_info_finished'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_intent_info_finished')));
  }



  getIntentdata(data: any): Observable<any> {
    let body = JSON.stringify(data);      console.log('selections',body);
    return this.http.post(this.nodepostlocalUrl + 'get-intent-data', body, this.httpOptions).pipe(catchError(this.handleError<any>('getIntentdata', body)));
  }

  forward_cutting_work_(data: any): Observable<any> {
    let body = JSON.stringify(data);      console.log('row',body);
    return this.http.post(this.nodepostlocalUrl + 'forward_cutting_work_', body, this.httpOptions).pipe(catchError(this.handleError<any>('forward_cutting_work_', body)));
  }



  get_paper_in_hand_plan(): Observable<any> {
      const url = `${this.localindexUrl + 'get_paper_in_hand_plan'}`;
      console.log(url);
      return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_paper_in_hand_plan')));
  }

  get_paper_list_of_selected_intent(id:any)
  {
    console.log('data..',id)
      const url = `${this.localindexUrl + 'get_paper_list_of_selected_intent'}/${id}`;
      console.log(url);
      return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_paper_list_of_selected_intent')));
 }

 get_company_list_of_selected_intent(model:any)
 {
   let body  = JSON.stringify(model); console.log('Req%%%%%%%%',body)
    return this.http.post(this.nodepostlocalUrl + 'get_company_list_of_selected_intent', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_company_to_master', body)));
 }

 relese_paper_from_store(data: any): Observable<any> {
  let body = JSON.stringify(data);      console.log('paper',body);
  return this.http.post(this.nodepostlocalUrl + 'relese_paper_from_store', body, this.httpOptions).pipe(catchError(this.handleError<any>('relese_paper_from_store', body)));

}

finish_intent_main(id: number): Observable<any> {
  const url = `${this.localindexUrl + 'finish_intent_main'}/${id}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('finish_intent_main')));
}

get_all_company_list(): Observable<any> {
  const url = `${this.localindexUrl + 'get_all_company_list'}`;
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_company_list')));
}


add_paper_to_stock(cust: any): Observable<any> {
  let body = JSON.stringify(cust);  console.log('body', body);
  return this.http.post(this.nodepostlocalUrl + 'add_paper_to_stock', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_paper_to_stock', body)));

}


getPaperStock(): Observable<any> {
  const url = `${this.localindexUrl + 'get_paper_stock_details'}`;
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('getPaperStock')));
}

add_company_to_master(data:any)
{
let body = JSON.stringify(data);  console.log('upcust',body);
return this.http.post(this.nodepostlocalUrl + 'add_company_to_master', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_company_to_master', body)));
}


add_paper_to_master(data:any)
{
  let body = JSON.stringify(data);  console.log('upcust',body);
  return this.http.post(this.nodepostlocalUrl + 'add_paper_to_master', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_paper_to_master', body)));
}

getCompanyData(): Observable<any> {
  const url = `${this.localindexUrl + 'get_all_company_list'}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('getCompanyData')));
}
getPaperData(): Observable<any> {
  const url = `${this.localindexUrl + 'all_papers_on_master'}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('getPaperData')));
}


add_plates_to_plate_store(data:any)
{
  let body = JSON.stringify(data);  console.log('dtaa',body);
  return this.http.post(this.nodepostlocalUrl + 'add_plates_to_plate_store', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_plates_to_plate_store', body)));
}

get_plate_store_data()
{
  const url = `${this.localindexUrl + 'get_plate_store_data'}`;
  console.log(url);
  return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_plate_store_data')));
}

  logout() :void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
  }






  get_new_printing_works(id:number) :  Observable<any> {
    const url = `${this.localindexUrl + 'get_new_printing_works'}/${id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_new_printing_works')));
  }


  get_all_work_list_new_print_set_finished(id:number) :  Observable<any> {
    const url = `${this.localindexUrl + 'get_all_work_list_new_print_set_finished'}/${id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_all_work_list_new_print_set_finished')));
  }


  get_printing_works_splits(p_det_id:number) :  Observable<any> {
    const url = `${this.localindexUrl + 'get_printing_works_splits'}/${p_det_id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_printing_works_splits')));
  }

  get_paper_infos_main_and_sub_for_print_new_work_incl_excess_paper(p_det_id:number):  Observable<any> {
    const url = `${this.localindexUrl + 'get_paper_infos_main_and_sub_for_print_new_work_incl_excess_paper'}/${p_det_id}`;
    console.log(url);
    return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.handleError<any>('get_paper_infos_main_and_sub_for_print_new_work_incl_excess_paper')));
  }

  save_machine_readings(data:any)
  {
    let body = JSON.stringify(data);  console.log('upcust',body);
    return this.http.post(this.nodepostlocalUrl + 'save_machine_readings', body, this.httpOptions).pipe(catchError(this.handleError<any>('save_machine_readings', body)));
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
