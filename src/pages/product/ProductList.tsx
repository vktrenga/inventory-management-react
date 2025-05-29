import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProduct";

const columns: GridColDef[] = [
  { field: "product_name", headerName: "Product Name", width: 200 },
  { field: "product_code", headerName: "Product Code", width: 200 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "brand", headerName: "Brand", width: 100 },
  {
    field: "variant_rel", headerName: "Variants", width: 100,
    renderCell: (params) => {
      if (params.value && params.value.length > 0) {
        return <span> True </span>;
        // return params.value && params.value.length > 0 ? true : false
      } else {
        return <span>No Variants</span>;
      }
    },
  },
  {
    field: "product_images",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      if (params.value && params.value.length > 0) {
        return <img src={params?.value[0]?.image_url} />;
      } else {
        return <span>No Images</span>;
      }
    },
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 100,
    type: "boolean",
  },
];

const ProductList = () => {
  const handleDelete = (id: number) => {
    alert(id);
  };
  const { data, isLoading, error } = useProducts();
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
         <Link to={`/product`}>
         <button>Add New Products</button></Link>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="product" columns={columns} rows={data?.data?.data || []}  deletecallback={handleDelete}/>
      )}
    </div>
  );
};

export default ProductList;
