import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Switch,
  FormGroup,
  styled,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const categories = ["Electronics", "Apparel", "Books", "Home", "Beauty"];
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const ProductForm = () => {
  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event:any) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // TODO: handle form submission
    console.log("Product submitted");
  };

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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} >

          <Grid size={12} >
            <TextField label="Product Name" fullWidth required />
          </Grid>

          <Grid size={12} >
            <TextField label="Product Code" fullWidth required />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={handleCategoryChange} label="Category">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth required>
              <InputLabel>Brand</InputLabel>
              <Select value={category} onChange={handleCategoryChange} label="Brand">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Barcode Mode</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="batch" control={<Radio />} label="Batch" />
                <FormControlLabel value="serial" control={<Radio />} label="Serial" />
                <FormControlLabel value="no" control={<Radio />} label="No Barcode" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormGroup>
              <FormControlLabel required control={<Switch defaultChecked />} label="stock Maintenanceble" />
            </FormGroup>
          </Grid>
          <Grid size={12}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Product
            </Button>
          </Grid>
        </Grid>
        
      </form>
    </Box>
  );
};

export default ProductForm;
