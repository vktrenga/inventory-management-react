export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
  category: string;
  is_series:boolean;
  is_batch:boolean;
}

export interface ProductFormProps {
  productFormProps: {
    id: number | null;
    productData: {
      product_name: string;
      product_code?: string;
      category_id?: string;
      brand_id?: string;
      description?: string;
      is_stock_maintain?: boolean;
    };
  } | null;
}
export interface ProductFormData {
  product_name: string;
  product_code: string;
  category_id: string;
  brand_id: string;
  description: string;
  is_series: boolean;
  is_batch: boolean;
  is_stock_maintain: boolean;
}