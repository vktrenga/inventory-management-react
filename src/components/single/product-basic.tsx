import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Select,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Switch,
  FormGroup,
  Grid,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useProduct";
import { useBrandList, useCategoriesList } from "../../hooks/useMaster";
import type { Brand, Category } from "../../types/master";
import { ProductFormData } from "../../types/product";
// Define the form schema using Yup
const schema = yup.object().shape({
  product_name: yup.string().required("Product Name is required"),
  product_code: yup.string().required("Product Code is required"),
  category_id: yup.string().required("Category is required"),
  brand_id: yup.string().required("Brand is required"),
  description: yup.string().required("Description is required"),
  is_series: yup.boolean().default(false),
  is_batch: yup.boolean().default(false),
  is_stock_maintain: yup.boolean().default(true),
});

// Define the ProductFormProps interface
interface ProductFormProps {
  productFormProps: {
    productData?: Partial<ProductFormData>;
    id?: string | null
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ productFormProps }) => {
  const [isSeries, setIsSeries] = useState(false);
  const [barcode_mode, setBarcodeMode] = useState("batch");
  const [isBatch, setIsBatch] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const productId = productFormProps?.id?? null;
  const setDefaultValues = () => {
    return {
      product_name: productFormProps?.productData?.product_name ?? "",
      product_code: productFormProps?.productData?.product_code ?? "",
      category_id: productFormProps?.productData?.category_id ?? "",
      brand_id: productFormProps?.productData?.brand_id ?? "",
      description: productFormProps?.productData?.description ?? "",
      is_series: productFormProps?.productData?.is_series ?? false,
      is_batch: productFormProps?.productData?.is_batch ?? false,
      is_stock_maintain: productFormProps?.productData?.is_stock_maintain ?? true,
    }
  }

  useEffect(() => {
    if(!productFormProps?.productData?.is_batch){
      setBarcodeMode("series")
    } else {
      setBarcodeMode("batch")
    }
    reset(setDefaultValues());
    
  }, [productFormProps?.productData?.category_id]);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: setDefaultValues(),
  });

  const categoriesList = useCategoriesList();
  const categories = useMemo(
    () =>
      Array.isArray(categoriesList.data?.data?.data)
        ? categoriesList.data.data.data
        : [],
    [categoriesList.data]
  );

  const brandList = useBrandList();
  const brands = useMemo(
    () =>
      Array.isArray(brandList.data?.data?.data)
        ? brandList.data.data.data
        : [],
    [brandList.data]
  );

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    data.is_batch = isBatch;
    data.is_series = isSeries;
    setFormError(null);
    if(productId) {
      updateProduct(
        {
          id: productId,
          data: { ...data } as Partial<ProductFormData>,
        },
        {
          onSuccess: (response: { data: { message: React.SetStateAction<string | null>; }; }) => {
            setFormSuccess(response?.data?.message);
            setTimeout(() => setFormSuccess(null), 10000);
          },
          onError: (error: any) => {
            const errorMessages = error?.response?.data?.errors
              ?.map((err: any) => `${err.field} - ${err.error}`)
              .join(", ");
            setFormError(errorMessages || "An error occurred");
          },
        }
      );
    } else {
      createProduct(data, {
        onSuccess: (response) => {
          setFormSuccess(response?.data?.message);
          setTimeout(() => setFormSuccess(null), 10000);
        },
        onError: (error: any) => {
          const errorMessages = error?.response?.data?.errors
            ?.map((err: any) => `${err.field} - ${err.error}`)
            .join(", ");
          setFormError(errorMessages || "An error occurred");
        },
      });
    }


    
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files);
    }
  };

  const handleBarcodeMode = (_event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsSeries(value === "series");
    setIsBatch(value === "batch");
    setBarcodeMode(value) 
  };

  const FormField = ({
    name,
    label,
    type = "text",
    multiline = false,
    rows,
  }: {
    name: keyof ProductFormData;
    label: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
  }) => (
    <Grid size = {12}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            fullWidth
            multiline={multiline}
            rows={rows}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        )}
      />
    </Grid>
  );
  if (productId && !productFormProps?.productData) return <p>Loading products...</p>;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Product 

      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {formError && (
            <Alert
              severity="error"
              sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1300,
                mb: 2,
              }}
              onClose={() => setFormError(null)}
            >
              {formError}
            </Alert>
          )}
          {formSuccess && (
            <Alert
              severity="success"
              sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1300,
                mb: 2,
              }}
              onClose={() => setFormSuccess(null)}
            >
              {formSuccess}
            </Alert>
          )}

          <FormField name="product_name" label="Product Name" />
          <FormField name="product_code" label="Product Code" />
          <Grid size = {12}>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.category_id}>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category">
                  <MenuItem 
                        key={"0"} 
                        value={""}
                        >
                        Select Category
                        </MenuItem>
                    {categories.map((category: Category) => (
                        <MenuItem 
                        key={category.id} 
                        value={category.id}
                        >
                        {category.category_name}
                        </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.category_id?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Grid>
          <Grid size = {12}>
            <Controller
              name="brand_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.brand_id}>
                  <InputLabel>Brand</InputLabel>
                  <Select {...field} label="Brand">
                   <MenuItem 
                        key={"0"} 
                        value={""}
                        >
                        Select Brand
                        </MenuItem>
                    {brands.map((brand: Brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.brand_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.brand_id?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Grid>
          <FormField
            name="description"
            label="Description"
            multiline
            rows={4}
          />
          <Grid size = {12}>
            <FormControl>
              <FormLabel id="barcode-mode-label">Barcode Mode </FormLabel>
                <RadioGroup
                aria-labelledby="barcode-mode-label"
                value={barcode_mode}
                name="barcode_mode"
                onChange={handleBarcodeMode}
                >
                <FormControlLabel
                  value="batch"
                  control={<Radio />}
                  label="Batch"
                />
                <FormControlLabel
                  value="series"
                  control={<Radio />}
                  label="Series"
                />
                </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size = {12}>
            <Controller
              name="is_stock_maintain"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                  control={
                    <Switch
                    {...field}
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Stock Maintainable"
                  />
                </FormGroup>
              )}
            />
          </Grid>
          <Grid size = {12}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
                multiple
                aria-label="Upload files"
              />
            </Button>
          </Grid>
            <Grid size={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Product
            </Button>
            </Grid>
            <Grid size={4} container justifyContent="flex-end" sx={{ ml: 4 }}>
            
            </Grid>
          <Grid size ={1} container justifyContent="flex-end">
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => {
              const variantsTab = document.getElementById("simple-tab-1");
              if (variantsTab) {
                variantsTab.click();
              }
              }}
            >
              Next
            </Button>
            </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductForm;
