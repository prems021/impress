export interface Customer
{
    id : number,
    com_id : number,
    gst_in : string,
    name : string,
    street: string,
    address_1 : string
    address_2 : string
    type : number,
    opening_balance : number,
    credit_balance : number


}







export interface Engineer
{
    id : number,
    com_id : number,
    batch_id : number,
    bar_code : string,
    hsn_code : string,
    product_name : string,
    product_description : string,
    category_id: number,
    tax_rate : number,
    mrp : number,
    rate : number,
    unit_id : number,
    opening_stock : number,
    createdAt : string,
    updatedAt : string


}

export interface PdtCategory
{
category_name: string,
com_id: number,
id : number
}
export interface Unit
{
com_id: number,
id: number,
unit: string
}
