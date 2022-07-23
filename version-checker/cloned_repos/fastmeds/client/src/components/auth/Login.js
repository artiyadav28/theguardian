import React,{useState ,useRef} from 'react';
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
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';
import { useNavigate, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Form = styled('form')``;
const Div = styled('div')``;
function Login({login , isAuthenticated, loading}) {
     const navigate = useNavigate();
    const formRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
   

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleRegister = () => {
      navigate('/auth/register');
    };

    //redirect if authenticated
    if(isAuthenticated){
        return  <Navigate to='/dashboard'/>
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
                  {/* <div
                  style={{
                    fontSize: '20px',
                    color: 'grey',
                    textAlign: 'center',
                  }}
                >
                  Company Portal
                </div> */}
                </Grid>
              </Grid>
              <Typography component="div" style={{ textAlign: 'center' }}>
                <Box fontSize={26} sx={{ m: 1 }} paddingT>
                  Sign into your account
                </Box>
              </Typography>
              <Formik
                innerRef={formRef}
                initialValues={{ email: '', password: '', rememberUser: false }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Email is required!';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address!';
                  }
    
                  if (!values.password) {
                    errors.password = 'Password is required!';
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = {
                    email: values.email,
                    password: values.password,
                    // rememberUser: values.rememberUser,
                  };
                  
                    login(formData.email,formData.password);
                  
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Form sx={{ width: '100%', mt: 1 }} onSubmit={handleSubmit} autoComplete="false">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <Grid item xs={9}>
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
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Grid>
    
                      <Grid item xs={9}>
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
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Grid>
    
                      {/* <Grid item xs={9}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.rememberUser}
                            id="rememberUser"
                            name="rememberUser"
                            onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="Keep me signed in"
                      />
                    </Grid> */}
    
                      <Grid item xs={9}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={loading}
                        >
                          Sign In
                        </Button>
                        <Button style={{ fontSize: '14px' }} onClick={handleRegister}>
                          New user? Register here
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

Login.protoTypes={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})
export default connect(mapStateToProps , { login })(Login);

