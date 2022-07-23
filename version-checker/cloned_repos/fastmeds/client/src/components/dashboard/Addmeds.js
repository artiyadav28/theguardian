import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UpdateTable from "../helper/UpdateTable";
import { updateItems } from "../../actions/item";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
const Addmeds = ({updateItems}) => {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  const [generic, setGeneric] = useState("");
  const [med, setMed] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(med);
    setList([
      ...list,
      {
        id,
        genericName: generic.toLowerCase(),
        medName: med.toLowerCase(),
        price,
        quantity,
        itemType: 'medicine'
      },
    ]);
    setId(id+1);
    setGeneric("");
    setMed("");
    setPrice(0);
    setQuantity(0);
  };

  const updateInventory = async (e) => {
    e.preventDefault()
   
    updateItems(list);
    setId(0);
    setGeneric("");
    setMed("");
    setPrice(0);
    setQuantity(0);
    setList([]);
  }

  const deleteItem = (uid) => {
    setList(list.filter(item => item.id !== uid));
  }
  return (
    <>
     
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": {mt:1,  mr:1},
        }}
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
      >
        <div>
          <TextField
            required
            id='outlined-helperText'
            label='Medicine Name'
            value={med}
            onChange={(e) => setMed(e.target.value)}
          />
          <TextField
            required
            id='outlined-helperText'
            label='Generic Name'
            value={generic}
            onChange={(e) => setGeneric(e.target.value)}
          />
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
          <TextField
            required
            id='outlined-number'
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ height: "50px", mt:1 }}
          >
            Add Item
          </Button>
        </div>
      </Box>

      <UpdateTable rows={list} deleteItem={deleteItem}/>

      {
        list.length === 0 ? <h3>No Items</h3>:<Button
        variant='contained'
        sx={{mt:2, height: "50px" }}
        onClick={(e)=> updateInventory(e)}
      >
       Update Inventory
      </Button>
      }
    </>
  );
};

Addmeds.protoTypes={
  updateItems: PropTypes.func.isRequired,
  
}


export default connect(null , { updateItems })(Addmeds);
