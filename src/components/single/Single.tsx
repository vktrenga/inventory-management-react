import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./single.scss";
import ProductForm from './product-basic';
import BundleProductMappingMaster from './bundleProduct';
import ProductVariantMaster from './variant';

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Single = (props: Props) => {
  console.log(props);
   const [value, setValue] = React.useState(0);
  
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  return (
    <div className='single'>
    <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Variants" {...a11yProps(1)} />
              <Tab label="Bundle Product" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <ProductForm></ProductForm>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ProductVariantMaster/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <BundleProductMappingMaster/>
          </CustomTabPanel>
        </Box>
  </div>
  );
};

export default Single;
