import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Lock from '@mui/icons-material/Lock';
import Mail from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';
import MuiPhoneNumber from 'material-ui-phone-number';
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import { useNavigate, Navigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import showToast from '../../utils/showToastNotification';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

const Form = styled('form')``;
const Div = styled('div')``;

const userTypes = [
  {
    value: 'medical-store',
    label: 'Medical Store',
  },
  {
    value: 'hospital',
    label: 'Hospital',
  }
];

function Register({register , isAuthenticated, loading}) {
  const navigate = useNavigate();
  const formRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('medical-store');

  const handleChangeSelect = (event) => {
    setUserType(event.target.value);
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  if (!navigator.geolocation) showToast('ERROR', 'Please give permission to access location');
  else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  let lat;
  let long;
  function success(pos) {
    const crd = pos.coords;
    lat = crd.latitude.toString();
    long = crd.longitude.toString();
  }
  function error(err) {
    showToast('ERROR', `ERROR(${err.code}): ${err.message}`);
  }
  if(isAuthenticated) {
    return <Navigate to="/dashboard"/>
  }
  return (
    <>
   
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Div
          sx={{
            mt: 6,
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            backgroundColor: 'white',
            borderradius: '10px',
            boxShadow:
              '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          }}
        >
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={9}>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '40px',
                  fontWeight: '400',
                  color: '#20639B',
                }}
              >
                FastMeds
              </div>
            </Grid>
          </Grid>
          <Typography component="div" style={{ textAlign: 'center' }}>
            <Box fontSize={26} sx={{ m: 1 }} paddingT>
              Create a new account
            </Box>
          </Typography>
          <Formik
            innerRef={formRef}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              userType: 'medical-store',
              name: '',
              phone: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name is required!';
              }
              if (!values.email) {
                errors.email = 'Email is required!';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address!';
              }

              if (!values.password) {
                errors.password = 'Password is required!';
              } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters';
              } else if (!values.password.match(/\d/) || !values.password.match(/[a-zA-Z]/)) {
                errors.password = 'Password must contain at least 1 letter and 1 number';
              }

              if (!values.confirmPassword) {
                errors.confirmPassword = 'Please re-enter password here';
              }

              if (!values.phone) {
                errors.phone = 'Contact no. is required!';
              }

              if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
                errors.confirmPassword = "This doesn't match with the above password";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const formdata = {
                email: values.email,
                password: values.password,
                name: values.name,
                contact: values.phone,
                userType: userType,
                latitude: lat,
                longitude: long,
              };
              
                register(formdata);
              
            }}
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form sx={{ width: '100%', mt: 1 }} onSubmit={handleSubmit} autoComplete="false">
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      required
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="standard-weight-helper-text-name-register">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="outlined-select-currency"
                      margin="normal"
                      fullWidth
                      select
                      label="Select Type"
                      name="userType"
                      value={userType}
                      onBlur={handleBlur}
                      onChange={handleChangeSelect}
                      required
                    >
                      {userTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={10}>
                    <MuiPhoneNumber
                      required
                      margin="normal"
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Contact no."
                      onBlur={handleBlur}
                      defaultCountry={'in'}
                      onChange={(e) => setFieldValue('phone', e)}
                      variant="outlined"
                      countryCodeEditable={false}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="standard-weight-helper-text-phone-register">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Mail color="disabled" />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-register">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="disabled" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Re-enter Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="disabled" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                              size="large"
                            >
                              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={loading}
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Button style={{ fontSize: '14px' }} onClick={handleLogin}>
                      Already have an account? Login here
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Div>
      </Container>
    </>
  );
}

Register.protoTypes={
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})
export default connect(mapStateToProps , { register })(Register);