export class Work {
    user_role : string;
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
    workSize_select : string;
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
    other_lamination_flag : boolean;
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
    status_flag: number;
    Gst_id : number;
    grand_amt : number;
  }


  export interface WorkApi {
    data: WorkData[];
    total_count: number;
  }

  export interface WorkData {

  }


  export interface Dtpdesign {
    Wid: number;
    dtpstat: number;
  }


  export interface FinishApi {
    data: FinishData[];
    total_count: number;
  }
  export interface Finish_intent {
    rows: FinishData[];
    count: number;
  }


  export interface FinishData {

  }


  export class MachineWork {
    //Wid: number;
    id: number;
    machine: string;
    printPlace: string;
    //paper: string;
    quantity: number;
    plates: number;
    remark: string;
  }

  export class MachineSelect {
    id: number;
    machine: string;
    paper_type: number;
    printplace: number;
    print_place: string;
    cut_place:number;
    quantity: number;
    plates: number;
    remark: string;
  }


  export interface EngineerNa {
    engineerName: string;
  }

  export interface GST {
    id: number,
    Gst_type: string;
    Gst_value: number;
  }


  export class Engineer {
    Eid: number;
    engineerName: string;
    mobile: number;
  }




  export interface EngineerData {

  }

  export interface EngineerApi {
    data: EngineerData[];
    total_count: number;
  }


export interface Work_size_select
{
id: number,
work_size_select: string
}
