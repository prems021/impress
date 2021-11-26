export interface company {
  Company_name: string
  id: number

}


export interface paper {
Gsm: number ;
Papertype: string;
Size: string;
id: number;

}

export interface response {
Paper_master : paper;
company_list: company;
company_id : number;
id: number;
paper_category_id: number;
paper_master_id: number;
quantity: number;

}




export interface RootObject {
  id: number;
  paper_master_id: number;
  company_id: number;
  paper_category_id: number;
  quantity: number;
  Paper_master: Papermaster;
  company_list: Companylist;
}

interface Companylist {
  id: number;
  Company_name: string;
}

interface Papermaster {
  id: number;
  Papertype: string;
  Gsm: number;
  Size: string;
}


export interface new_data
{
  id : number;
  qty : number;
  type : string,
  size : string;
  gsm : string;
  cat : string;
  company : string;
}
