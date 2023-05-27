import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography
} from '@material-ui/core';
import {
  OverviewStoreScore,
  OverviewLatestTransactions,
  OverviewPrivateWallet,
  OverviewCampaignsForYou,
  OverviewSalesByCategories,
  OverviewWeeklyEarnings,
  OverviewMetrics
} from '../../components/dashboard/overview';
import useSettings from '../../hooks/useSettings';
import ArrowRightIcon from '../../icons/ArrowRight';
import BriefcaseIcon from '../../icons/Briefcase';
import DownloadIcon from '../../icons/Download';
import ExternalLinkIcon from '../../icons/ExternalLink';
import InformationCircleIcon from '../../icons/InformationCircle';
import PlusIcon from '../../icons/Plus';
import UsersIcon from '../../icons/Users';
import gtm from '../../lib/gtm';
import useAuth from 'src/hooks/useAuth';

const Overview: FC = () => {
  const { settings } = useSettings();
  const { user } = useAuth()

  return (
    <>
      <Helmet>
        <title>BOUN Blockchain Based ABET Assestment Service</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  Overview
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  {user.name?.split(' ')[0]}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  New Transaction
                </Button> */}
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewWeeklyEarnings />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewPrivateWallet />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewSalesByCategories />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <OverviewCampaignsForYou />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewLatestTransactions />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Stack spacing={3}>
                <OverviewMetrics />
                <OverviewStoreScore />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
