

export interface Data_s {
  Wid: number;
  workNo: number;
  workName: string;
  workSize: string;
  workSize_select: string;
  copies: number;
  typePrinting: string;
  mColor: number;
  twoColor: number;
  sColor: number;
  bandWhite: number;
  cover: number;
  orderDate: string;
  estimateDate: string;
  lamination: string;
  other_lamination_flag: boolean;
  other_binding_flag: boolean;
  printPlace?: any;
  engineer: string;
  cid: number;
  folding: boolean;
  stitching: boolean;
  perfect: boolean;
  centerPin: boolean;
  padmaking: boolean;
  shringwrap: boolean;
  shring_wrap_bundle_each?: any;
  creasing: boolean;
  numbering: boolean;
  spiral_binding: boolean;
  case_binding: boolean;
  hard_binding: boolean;
  tin_mounting: boolean;
  hole_punch: boolean;
  flush_cutting: boolean;
  none_binding: boolean;
  other_binding: string;
  outsource: boolean;
  is_due_flag: boolean;
  white_flag: number;
  status_flag: number;
  gate_flag: number;
  Deli_loc: number;
  createdAt: string;
  updatedAt: string;
  Work_order_paper_details: Workorderpaperdetail[];
}

interface Workorderpaperdetail {
  id: number;
  work_order_id: number;
  paper_master_id: number;
  other_paper_flag: boolean;
  other_paper_name?: any;
  quantity: number;
  qty_released_from_store?: any;
  paper_category_id: number;
  print_building: number;
  cut_building: number;
  status_flag: number;
  white_flag: number;
  advance_cut_flag: number;
  advance_cut_location?: any;
  is_addi_paper_included: number;
  Company_assigned_id?: any;
}