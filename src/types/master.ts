export interface Category {
    id: string;
    category_name: string;
  }
  
  export interface Brand {
    id: string;
    brand_name: string;
  }

  export interface VariantAndVariantAttribute {
    id: string;
    variant_name: string;
    variant_attribute: [{
      id: string;
      variant_attribute_name: string;
    }];
  }

  export interface CommonResponse {
    success: boolean;
    message:string;
    data: any
  }
  
  