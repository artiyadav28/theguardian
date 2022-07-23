import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import UpdateBedTable from "../helper/UpdateBedTable";
import { updateItems } from "../../actions/item";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Addbed = ({ updateItems }) => {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  //   const [generic, setGeneric] = useState("");
  const [med, setMed] = useState("");
  const [quantity, setQuantity] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    setList([
      ...list,
      {
        id,
        genericName: med.toLowerCase(),
        medName: med.toLowerCase(),
        price:0,
        quantity,
        itemType: "hospital",
      },
    ]);
    setId(id + 1);
    // setGeneric("");
    setMed("");
    // setPrice(0);
    setQuantity(0);
  };

  const updateInventory = async (e) => {
    e.preventDefault();

    updateItems(list);
    setId(0);
    // setGeneric("");
    setMed("");
    // setPrice(0);
    setQuantity(0);
    setList([]);
  };

  const deleteItem = (uid) => {
    setList(list.filter((item) => item.id !== uid));
  };

 
  return (
    <>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { mt: 1, mr: 1 },
        }}
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
      >
        <div>

     <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Bed Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={med}
          label="Bed Type"
          onChange={(e) => setMed(e.target.value)}
        >
            <MenuItem value='icu'>ICU</MenuItem>
            <MenuItem value='covid'>covid</MenuItem>
            <MenuItem value='emergency'>emergency</MenuItem>
            <MenuItem value='mango'>Mango</MenuItem>
        </Select>
      </FormControl>

          <TextField
            required
            id='outlined-number'
            label='Quantity'
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        
          <Button
            type='submit'
            variant='contained'
            sx={{ height: "50px", mt: 1 }}
          >
            Add Item
          </Button>
        </div>
      </Box>

      <UpdateBedTable rows={list} deleteItem={deleteItem} />

      {list.length === 0 ? (
        <h3>No Items</h3>
      ) : (
        <Button
          variant='contained'
          sx={{ mt: 2, height: "50px" }}
          onClick={(e) => updateInventory(e)}
        >
          Update Inventory
        </Button>
      )}
    </>
  );
};

Addbed.protoTypes = {
  updateItems: PropTypes.func.isRequired,
};

export default connect(null, { updateItems })(Addbed);
