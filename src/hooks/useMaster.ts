import { useQuery } from '@tanstack/react-query';
import * as masterApi from '../api/masterApi';


export const useCategoriesList= () => {
  return useQuery(['categories'], masterApi.getCategoryList);
}
 
export const useBrandList= () => {
  return useQuery(['brands'], masterApi.getBrandList);
}


export const useVaraintAttributes= () => {
  return useQuery(['varaintAttributes'], masterApi.getVariantAttributesList);
}

export const useVaraintAttributesValues= () => {
  return useQuery(['useVaraintAttributesValues'], masterApi.getVariantAttributesValueList);
}