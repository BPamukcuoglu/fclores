import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import {
  AnalyticsGeneralOverview,
  AnalyticsListOfPC,
  AnalyticsCourseCLO,
  AnalyticsShortViewPerCourse,
  AnalyticsYearlyComparison
} from '../../components/dashboard/analytics';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import DownloadIcon from '../../icons/Download';
import { reportApi } from 'src/apis/reportApi';
import useMounted from 'src/hooks/useMounted';
import { Report } from 'src/types/report';
import AnalyticsYearlyComparisonByLecture from 'src/components/dashboard/analytics/AnalyticsComparisonByLecture';

const Analytics: FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [pcData, setPCData] = useState();
  const [reports, setReports] = useState<Report[]>([]);

  const getReport = useCallback(async () => {
    try {
      const data = await reportApi.getCollectives();
      const reportsData = await reportApi.getReports();

      console.log(reportsData)
      if (mounted.current) {
        setPCData(data)
        setReports(reportsData)
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  if (!reports || !pcData) {
    return null;
  }

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
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Analytics
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Analytics
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Button
                endIcon={<DownloadIcon fontSize="small" />}
                variant="outlined"
                onClick={() => { document.execCommand('print') }}
              >
                Export
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ py: 3 }}>
            <AnalyticsGeneralOverview
              totalNumberOfReports={reports.length}
              totalNumberOfTimestampedReports={reports.filter(((a) => a.status === 'timestamped')).length}
            />
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={9}
              md={8}
              xs={12}
            >
              <AnalyticsYearlyComparison
                pcData={pcData}
                field="clos"
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              item
              xl={3}
              md={4}
              xs={12}
            >
              <AnalyticsShortViewPerCourse reports={reports} />
            </Grid>
            <Grid
              item
              xl={12}
              md={12}
              xs={12}
            >
              <AnalyticsYearlyComparison
                pcData={pcData}
                field="pcs"
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              item
              xl={9}
              md={8}
              xs={12}
            >
              <AnalyticsYearlyComparisonByLecture reports={reports} />
            </Grid>
            <Grid
              item
              xl={3}
              md={4}
              xs={12}
            >
              <AnalyticsCourseCLO reports={reports} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Analytics;
