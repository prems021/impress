
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError, shareReplay,tap, filter,map,delay } from 'rxjs/operators';




import { HttpErrorHandler, HandleError } from './error-handler';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};





@Injectable()
export class httpService   {

  


  post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0}
  report_demo : any = {report_type : "",from_date:'',to_date:'',e_no:0}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

 


  



 
  


 
  
  





  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) { 
                                                                             this.handleError = httpErrorHandler.createHandleError('HeroesService');
                                                                            }
                                                                         

  getData() {
    return this.http.get('/assets/config.json');
  }


   

 

  


  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.admin_url + 'users',httpOptions)
  //     .pipe(
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  // getLocal (): Observable<Zero[]> {
  //   return this.http.get<Zero[]>(this.admin_url + 'users',httpOptions)
  //     .pipe(
  //       catchError(this.handleError('getLocal', []))
  //     );
  // }

}