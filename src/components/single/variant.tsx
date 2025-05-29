import React, { useEffect, useState, useCallback } from 'react';
import {
  Typography, TextField, Button, Box,
  Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  FormControl, InputLabel, Select, MenuItem,
  ListItemText, Checkbox, SelectChangeEvent
} from '@mui/material';
import { useVaraintAttributes, useVaraintAttributesValues } from '../../hooks/useMaster';

export default function ProductVariantMaster() {
  const staticOption = ["Price"];
  const [rows, setRows] = useState<any[]>([]);
  const [selectedVariantAttributesList, setSelectedVariantAttributes] = useState<Record<string, any>[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [attributesListData, setAttributesListData] = useState<any[]>([]);
  const [attributesValueListData, setAttributesValueListData] = useState<any | null>(null);
  const [mergedAttributesValues, setMergedAttributesValues] = useState<any[]>([]);

  const attributesList = useVaraintAttributes();
  const attributesValueList = useVaraintAttributesValues();

  useEffect(() => {
    if (attributesList?.data?.data) {
      setAttributesListData(attributesList.data.data.data);
    } 
  }, [attributesList]);

  useEffect(() => {
    if (attributesValueList?.data?.data) {
      setAttributesValueListData(attributesValueList.data.data.data);
    }
  }, [attributesValueList]);

  useEffect(() => {
    if (attributesValueListData && attributesListData) {
      const valuesMap: { [key: string]: { name: string; id: string }[] } = {};

      attributesValueListData.forEach((val: any) => {
        if (!valuesMap[val.variant_id]) {
          valuesMap[val.variant_id] = [];
        }
        valuesMap[val.variant_id].push({
          name: val.name,
          id: val.id.toString(),
        });
      });

      const merged = attributesListData.map((attr: any) => ({
        attributes_name: attr.name,
        id: attr.id.toString(),
        values: valuesMap[attr.id] || [],
      }));
      setMergedAttributesValues(merged);
    }
  }, [attributesValueListData, attributesListData]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    setSelectedOptions(selectedIds);
  };

  useEffect(() => {
    const updatedVariantAttributesList = selectedOptions.map((variantId) => {
      const mergedData = mergedAttributesValues.find((item) => item.id === variantId);
      return {
        id: variantId,
        name: mergedData?.attributes_name || '',
        values: mergedData?.values || [],
      };
    });

    if (selectedOptions.length > 0) {
      staticOption.forEach((option) => {
        updatedVariantAttributesList.push({
          id: option,
          name: option,
          values: [],
        });
      });
    }

    setRows([]);
    setSelectedVariantAttributes(updatedVariantAttributesList);
  }, [selectedOptions, mergedAttributesValues]);
  useEffect(() => {
    if (selectedVariantAttributesList.length > 0) {
      handleAddRow();
    }
  }, [selectedVariantAttributesList]);
  const handleAddRow = useCallback(() => {
    setRows((prevRows) => [...prevRows, {}]);
  }, []);

  const handleVariantAttributesChange = useCallback(
    (index: number, event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>, attributesKey: string) => {
      const { value } = event.target;
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        if (updatedRows[index]) {
          updatedRows[index][attributesKey] = value;
        }
        return updatedRows;
      });
    },
    []
  );

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
      <form>
        <Grid container spacing={2}>
          <Grid size = {12}>
            <FormControl fullWidth>
              <InputLabel id="multi-select-label">Variant Attributes</InputLabel>
              <Select
                labelId="multi-select-label"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected) =>
                  selected
                    .map((id) => mergedAttributesValues.find((item) => item.id === id)?.attributes_name)
                    .join(", ")
                }
              >
                {mergedAttributesValues.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={selectedOptions.includes(item.id)} />
                    <ListItemText primary={item.attributes_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {selectedVariantAttributesList.map((attr) => (
                      <TableCell key={attr.id}>{attr.name}</TableCell>
                    ))}
                    {/* <TableCell>Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      {selectedVariantAttributesList.map((attr) => (
                        <TableCell key={attr.id}>
                          {!staticOption.includes(attr.name) ? (
                            <Select
                              value={row[attr.name] || ''}
                              onChange={(event) =>
                                handleVariantAttributesChange(index, event, attr.name)
                              }
                              fullWidth
                            >
                              {attr.values.map((value: any) => (
                                <MenuItem key={value.id} value={value.id}>
                                  {value.name}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <TextField
                              value={row[attr.name] || ''}
                              onChange={(event) =>
                                handleVariantAttributesChange(index, event, attr.name)
                              }
                              placeholder={attr.name}
                              fullWidth
                            />
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
{rows.length === index+1 ? (
 
  <Button onClick={handleAddRow} variant="contained" color="primary">
+ Add Row
</Button>
) :   <Button
    onClick={() =>
      setRows((prevRows) => prevRows.filter((_, i) => i !== index))
    }
    variant="contained"
    color="secondary"
  >
    Remove 
  </Button> 
}
                        
                      </TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
