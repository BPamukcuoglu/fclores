import type { FC } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import wait from '../../../utils/wait';

const AccountGeneralSettings: FC = (props) => {
  const { user } = useAuth();

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 100,
                    width: 100
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.name}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
            >
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={{
            email: user.email || '',
            name: user.name || '',
            submit: null
          }}
          validationSchema={
            Yup
              .object()
              .shape({
                email: Yup
                  .string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                name: Yup
                  .string()
                  .max(255)
                  .required('Name is required'),
              })
          }
          onSubmit={async (values, {
            resetForm,
            setErrors,
            setStatus,
            setSubmitting
          }): Promise<void> => {
            try {
              // NOTE: Make API request
              await wait(200);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Profile updated!');
            } catch (err) {
              console.error(err);
              toast.error('Something went wrong!');
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Profile" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={
                          touched.email && errors.email
                            ? errors.email
                            : 'We will use this email to contact you'
                        }
                        label="Email Address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
