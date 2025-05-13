import {
  Box,  Card, CardContent, Typography,
  Select, MenuItem, Checkbox, List, ListItem,
  ListItemText, ListItemIcon, Button
} from '@mui/material';

// Sample data
const masterProducts = ['Gaming PC', 'Office PC', 'Developer Rig'];
const allSubProducts = ['Mouse', 'Keyboard', 'Monitor', 'CPU', 'Headset'];



export default function BundleProductMappingMaster() {
  return (
    <Card sx={{ maxWidth: "100%", margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bundled Product Mapping Master
        </Typography>

        <Box mb={2}>
          <Typography variant="subtitle1">Select Master Product</Typography>
          <Select
            fullWidth
          >
            {masterProducts.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Typography variant="subtitle1">Sub-Products</Typography>
        <List>
          {allSubProducts.map((sub) => (
            <ListItem key={sub} component="button" >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  // checked={mappedSubs.includes(sub)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={sub} />
            </ListItem>
          ))}
        </List>

        <Box mt={2}>
          <Button variant="contained" color="primary">
            Save Mapping
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
