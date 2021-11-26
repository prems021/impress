
export interface RootObject {
  data: Data;
  success: boolean;
}

interface Data {
  count: number;
  rows: Row[];
}

interface Row {
  id: number;
  work_order_id: number;
  paper_master_id: number;
  other_paper_flag: boolean;
  other_paper_name?: any;
  quantity?: any;
  qty_released_from_store?: any;
  paper_category_id?: any;
  print_building?: any;
  cut_building?: any;
  status_flag: number;
  white_flag: number;
  advance_cut_flag: number;
  advance_cut_location?: any;
  is_addi_paper_included: number;
  Company_assigned_id?: any;
  Work_order_paper_subs: Workorderpapersub[];
  Paper_master: Papermaster;
}

interface Papermaster {
  id: number;
  Papertype: string;
  Gsm: number;
  Size: string;
}

export interface Workorderpapersub {
  id: number;
  work_order_details_id: number;
  qty_splitted?: any;
  machine?: any;
  printplace?: any;
  paper_category_id?: any;
  start?: any;
  end?: any;
  used_paper?: any;
  plates?: any;
  plate_size?: any;
  remarks?: any;
  status_flag?: any;
  createdAt: string;
  updatedAt: string;
}


