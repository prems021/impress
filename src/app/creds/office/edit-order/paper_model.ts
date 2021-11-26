export interface PaperApi {
    data: PaperData[];
    total_count: number;
  }
  
  export interface PaperData {
    Paperid: number;
    PaprCompny: string;
    PaprType: string;
    PaprSize: string;
    PaprGsm: number;
    PaprQuantity: number;
    PaprCategory: string;
  }
  
  
  
  export interface PaperTy {
    id : number  
    paper_id: number;
    Papertype: string;
    Gsm: number;
    Size: string;
  }
  
  
  export interface numarr {
    id: number;
    Wid: number;
  }
  
  
  export interface Addpaper {
    id: number;
    Wid: number;
    paper: string;
    other_paper : string;
  }
  
  
  
  export interface Uppaper {
    id: number;
    paper: string;
  }
  
  
  export interface numarr {
    id: number;
    Wid: number;
  }
  
  
  export interface PaperQy {
    Gsm: number;
  }
  
  export interface paperinfo_model {
    
    Gsm: number
    Papertype: string
    Size: string,
    paper_master_id : number,
    other_paper : string
  }
  
  
  
  