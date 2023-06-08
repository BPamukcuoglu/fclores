import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography
} from '@material-ui/core';
import {
  Login as LoginComponent
} from '../../components/authentication/login';
import Logo from '../../components/Logo';
import useAuth from '../../hooks/useAuth';

const Login: FC = () => (
    <>
      <Helmet>
        <title>BOUN Blockchain Based ABET Assestment Service</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py: '80px' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          >
            <RouterLink to="/">
              <Logo
                sx={{
                  height: 100,
                  width: 100
                }}
              />
            </RouterLink>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Log in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Log in on the BOUN Blockchain Based ABET Assestment Service
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                <LoginComponent />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                href="mailto:ozturaca@boun.edu.tr"
                variant="body2"
              >
                Create new account
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );

export default Login;
