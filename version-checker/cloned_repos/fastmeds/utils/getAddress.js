const axios = require('axios');
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const getAddress = async (lat, long) => {
  // console.log(lat,long);
  try{
    const response = await axios.get(
      `https://apis.mapmyindia.com/advancedmaps/v1/9ae502f52c932dbb7390f1e765d4b40c/rev_geocode?lat=${lat}&lng=${long}`
    );
    let city = response.data.results[0].city.toLowerCase();
    if (city === '') city = response.data.results[0].state.toLowerCase();
  
    // console.log(city);
    return {
      city,
      address: response.data.results[0].formatted_address.toLowerCase(),
    };
  }catch(e){
    // throw new ApiError("city could not be found");
    res.status(500).send({msg:"city could not be detected"});
  }
  
};

module.exports = getAddress;
