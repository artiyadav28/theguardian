import React, {useState} from "react";
// import './App.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RemoveTable from "../helper/RemoveTable";
import { deleteItems } from "../../actions/item";
const Removemeds = ({ auth: { user, isAuthenticated, loading }, deleteItems }) => {
  // note: the id field is mandatory
  // const items = [
  //   {
  //     id: 0,
  //     name: 'Cobol'
  //   },
  //   {
  //     id: 1,
  //     name: 'JavaScript'
  //   },
  //   {
  //     id: 2,
  //     name: 'Basic'
  //   },
  //   {
  //     id: 3,
  //     name: 'PHP'
  //   },
  //   {
  //     id: 4,
  //     name: 'Java'
  //   }
  // ]
  const [list, setList] = useState([]);
  const [id, setId] = useState("");
  const [key, setKey] = useState(0);
  const [generic, setGeneric] = useState("");
  const [med, setMed] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [maxquantity, setMaxQuantity] = useState(0);
  const [buyer, setBuyer] = useState("");
  const [amount,setAmount] = useState(0);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(med);
    setAmount(amount+quantity*price);
    setList([
      ...list,
      {
        id,
        key,
        genericName: generic,
        medName: med,
        price,
        quantity,
        itemType: "medicine",
      },
    ]);
    setId("");
    setKey(key+1);
    setGeneric("");
    setMed("");
    setPrice(0);
    setQuantity(0);
    setMaxQuantity(0);
  };

  const updateInventory = async (e) => {
    e.preventDefault();

    deleteItems({list,amount,buyer});
    setId("");
    setGeneric("");
    setMed("");
    setPrice(0);
    setAmount(0);
    setQuantity(0);
    setMaxQuantity(0);
    setList([]);
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results)
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result)
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setId(item._id);
    setGeneric(item.genericName);
    setMed(item.medName);
    setPrice(item.price);
    setMaxQuantity(item.quantity);
  };

  const handleOnFocus = () => {
    // console.log('Focused')
  };
  const deleteItem = (row) => {
    setAmount(amount-row.price*row.quantity);
    setList(list.filter(item => item.key !== row.key));
  }
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left", zIndex: 2000 }}>
          id: {item._id}
        </span>
        <span style={{ display: "block", textAlign: "left", zIndex: 2000 }}>
          name: {item.medName}
        </span>
      </>
    );
  };

  return (
    <>
     { !loading && user &&
      <div className='App' style={{ width: 400, zIndex: 2000 }}>
        <header className='App-header'>
          <div style={{ width: 400, zIndex: 2000 }}>
            <ReactSearchAutocomplete
              items={user.inventory}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ["medName"] }}
              resultStringKeyName='medName'
            />
          </div>
        </header>
      </div>}
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { mt: 1, mr: 1 },
        }}
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
      >
        <div>
          <TextField
            required
            id='outlined-helperText1'
            label='Medicine Name'
            value={med}
            InputProps={{
              readOnly: true,
            }}
            
          />
          <TextField
            required
            id='outlined-helperText2'
            label='Generic Name'
            value={generic}
            InputProps={{
              readOnly: true,
            }}
            
          />
          <TextField
            error={quantity > maxquantity}
            required
            id='outlined-number1'
            label='Quantity'
            type='number'
            value={quantity}
            helperText={`Stock Available=${maxquantity}`}
            onChange={(e) => setQuantity(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id='outlined-number2'
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
            sx={{ height: "50px", mt: 1 }}
            disabled={med==="" || quantity > maxquantity}
          >
            Add Item
          </Button>
        </div>
      </Box>
      <RemoveTable rows={list} deleteItem={deleteItem} />
      {list.length === 0 ? (
        <h3>No Items</h3>
      ) : (
        <>
        <TextField
        required
        id='outlined-helperText1'
        label='Buyer Name'
        value={buyer}
        sx={{ m:2, height: "40px" }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setBuyer(e.target.value)}
      />
        <Button
          variant='contained'
          sx={{ m: 2, height: "50px" }}
          onClick={(e) => updateInventory(e)}
          disabled={buyer===""}
        >
          Update Inventory
        </Button>
        <Button
          variant="outlined"
          sx={{ m: 2, height: "50px" }}
      
       
        >
        Total: {amount}
        </Button>
       
      </>)}
    </>
  );
};

Removemeds.protoTypes = {
  auth: PropTypes.object.isRequired,
  deleteItems: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {deleteItems})(Removemeds);
