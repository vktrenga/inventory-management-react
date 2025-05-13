import React, { useEffect, useState } from 'react';
import {
   Typography, TextField, Button, Box,
  Grid,  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  SelectChangeEvent
} from '@mui/material';
// import { Add, Delete } from '@mui/icons-material';



export default function ProductVariantMaster() {
  let options = [{ "Size": ["S", "M", "L"] }, { "Color": ["Red", "Blue", "Green"] }, { "Material": ["Cotton", "Polyester"] }];
  const staticOption = ["Price"];

  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [variantAttributes, setvariantAttributes] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const variantAttributesValues = (attributesKey: string): string[] => {
    for(let i = 0; i < options.length; i++) {
      const option = options[i];
      const key: string = Object.keys(option)[0];
      if (key === attributesKey) {
        return option[key as keyof typeof option] || []; // Provide a default empty array
      }
    }
    return []
  }
  const handleChange = (event: any) => {
    setSelectedOptions(event.target.value);
  };
  useEffect(() => {
    const variantAttribute = selectedOptions.reduce((acc, option) => {
      acc[option] = '';
      return acc;
    }, {} as Record<string, string>);

    if (selectedOptions.length > 0) {
      staticOption.forEach((option) => {
        variantAttribute[option] = '';
      });
    }
    setRows([]);
    setvariantAttributes(variantAttribute);
  }, [selectedOptions]);



  useEffect(() => {
    return setRows(JSON.parse(JSON.stringify([variantAttributes])));
  }, [variantAttributes]);

  const handleVariantAttributesChange = (index: any, event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, attributesKey: string) => {
      const { value } = event.target;
      const updatedRows = [...rows];
      if (updatedRows[index]) { 
        updatedRows[index][attributesKey] = value;
      }
      setRows(updatedRows);
    };
  
  const handleAddRow = () => {
    setRows([...rows, { ...variantAttributes }]);
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
        Variant
      </Typography>
      <form >
        <Grid container spacing={2} >
          <Grid size={12} >
            <FormControl fullWidth>
              <InputLabel id="multi-select-label">Variant Attributes</InputLabel>
              <Select
                labelId="multi-select-label"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {options.map((item) => {
                  const key: string = Object.keys(item)[0];
                  return (
                    <MenuItem key={key} value={key}>
                      <Checkbox checked={selectedOptions.indexOf(key) > -1} />
                      <ListItemText primary={key} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {variantAttributes && Object.keys(variantAttributes).length > 0 && (
                      <>
                        {selectedOptions.map((option) => (
                          <TableCell key={option}>{option}</TableCell>
                        ))}
                        <TableCell>Price</TableCell>
                      </>
                    )}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 && rows.map((row, index) => {
                    const attributesKeys: string[] = Object.keys(row);
                    return (
                      <TableRow key={index}>
                        {attributesKeys.map((attributesKey) => (
                          <TableCell key={attributesKey}>
                            
                            {!staticOption.includes(String(attributesKey)) ? (
                              <Select
                                onChange={(event: SelectChangeEvent<string>) => handleVariantAttributesChange(index, event, attributesKey)}
                                name={attributesKey}
                                fullWidth
                              >

{variantAttributesValues(attributesKey).map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      <Checkbox checked={row[attributesKey] === item} />
                      <ListItemText primary={item} />
                    </MenuItem>
                  );
                })}
                              </Select>
                            ) : (
                              <TextField
                                value={row[attributesKey]}
                                onChange={(event) => handleVariantAttributesChange(index, event, attributesKey)}
                                placeholder={attributesKey}
                                name={attributesKey}
                                fullWidth
                              />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}


                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Button onClick={handleAddRow} variant="contained" color="primary">
                        + Add Row
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
