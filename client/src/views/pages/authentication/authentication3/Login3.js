import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo'; 
import MobileLogo from 'ui-component/LoginMobileLogo'; 
import AuthFooter from 'ui-component/cards/AuthFooter';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileView = useMediaQuery('(max-width: 600px)');
  
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '100vh', backgroundImage: 'url(background.jpg)', backgroundSize: 'cover' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <AuthCardWrapper sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Link to="#">
                      {isMobileView ? <MobileLogo /> : <Logo />}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h4' : 'h3'}>
                        ADMINISTRATOR LOGIN
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        Enter your credentials
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
