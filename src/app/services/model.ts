
export class User {
  constructor(

  public Id: number,
  public UserName : string,
  public Password: string,
  public  Email:string,
  public  FirstName:string,





  ) {} }

  export class Work {
    Wid: number;
    cid: number;
    orderDate: string;
    estimateDate: string;
    workNo: number;
    customerName: string;
    address: string;
    email: string;
    mob1: number;
    mob2: number;
    workName: string;
    workSize: string;
    copies: number;
    typePrinting: string;
    mColor: number;
    twoColor: number;
    sColor: number;
    bandWhite: number;
    cover: number;
    paper: string;
    //quality: string;
    lamination: string;
    printPlace: string;
    totalAmount: number;
    engineer: string;
    folding: string;
    stitching: string;
    perfect: string;
    centerPin: string;
    padmaking: string;
    shringwrap: string;
    creasing: string;
    numbering: string;
    other_binding: string;
    other_paper: string;
    travel_amt: number;
    tax: string;
    Gst_type: string;
    unitAmount: number;
    cess: number;
    discount: number;
    outsource: boolean;
  }


  export interface Givenpaper {
    Wid: number;
    paperdata: any[];
    releasepaper: any[];
    //Company: string;
  }


  export interface Delivery {
    Wid: number;
    delivery: string;
  }




  export interface Report_table {
    Wid: number;
    Grand_total: number;
    discount: number;
    orderDate: string;
    estimateDate : string;
    workName: string
    workNo: number
    workSize: string,
    customerName : string
  }
