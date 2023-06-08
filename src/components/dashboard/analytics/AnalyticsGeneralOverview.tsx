import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Avatar, Box, Button, Card, Divider, Grid, Typography } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import ArrowRightIcon from '../../../icons/ArrowRight';
import ChevronDownIcon from '../../../icons/ChevronDown';
import ChevronUpIcon from '../../../icons/ChevronUp';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import AcademicCap from 'src/icons/AcademicCap';
import DocumentText from 'src/icons/DocumentText';
import Template from 'src/icons/Template';
import Duplicate from 'src/icons/Duplicate';
import Calendar from 'src/icons/Calendar';
import CheckCircle from 'src/icons/CheckCircle';
import Adjustments from 'src/icons/Adjustments';
import DotsHorizontal from 'src/icons/DotsHorizontal';
import ExclamationCircle from 'src/icons/ExclamationCircle';
import Archive from 'src/icons/Archive';
import PencilAlt from 'src/icons/PencilAlt';

const LineChart: FC = () => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#7783DB'],
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    }
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width={120}
    />
  );
};

const BarChart: FC = () => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#7783DB'],
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      show: false
    }
  };

  const chartSeries = [{ data: [10, 20, 30, 40, 50, 60, 5] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      width={120}
    />
  );
};

interface AnalyticsGeneralOverviewProps {
  totalNumberOfReports: number;
  totalNumberOfTimestampedReports: number;
}

const AnalyticsGeneralOverview: FC<AnalyticsGeneralOverviewProps> = ({ totalNumberOfReports, totalNumberOfTimestampedReports }) => (
  <Grid
    container
    spacing={2}
  >
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
    >
      <Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            p: 3
          }}
        >
          <div>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Uploaded Course Reports
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mt: 1 }}
              variant="h4"
            >
              {totalNumberOfReports}
            </Typography>
          </div>
          <DocumentText fontSize="large" />
        </Box>
        <Divider />
        <Box
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            variant="text"
            to="/dashboard/reports"
            component={RouterLink}
          >
            See course report results
          </Button>
        </Box>
      </Card>
    </Grid>
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
    >
      <Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            p: 3
          }}
        >
          <div>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Timestamped Course Reports
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mt: 1 }}
              variant="h4"
            >
              {totalNumberOfTimestampedReports}
            </Typography>
          </div>
          <CheckCircle fontSize="large" />
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 3,
            py: 2
          }}
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
              color: 'success.main',
              height: 36,
              width: 36
            }}
          >
            <DotsHorizontal fontSize="small" />
          </Avatar>
          <Typography
            color="textSecondary"
            sx={{ ml: 1 }}
            variant="caption"
          >
            {(totalNumberOfTimestampedReports / totalNumberOfReports) * 100}%
          </Typography>
        </Box>
      </Card>
    </Grid>
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
    >
      <Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            p: 3
          }}
        >
          <div>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Pending Course Reports
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mt: 1 }}
              variant="h4"
            >
              {totalNumberOfReports - totalNumberOfTimestampedReports}
            </Typography>
          </div>
          <PencilAlt fontSize="large" />
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 3,
            py: 2
          }}
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
              color: 'warning.main',
              height: 36,
              width: 36
            }}
          >
            <DotsHorizontal fontSize="small" />
          </Avatar>
          <Typography
            color="textSecondary"
            sx={{ ml: 1 }}
            variant="caption"
          >
            {((totalNumberOfReports - totalNumberOfTimestampedReports) / totalNumberOfReports) * 100}%
          </Typography>
        </Box>
      </Card>
    </Grid>
  </Grid>
);

export default AnalyticsGeneralOverview;

AnalyticsGeneralOverview.propTypes = {
  totalNumberOfReports: PropTypes.number.isRequired,
  totalNumberOfTimestampedReports: PropTypes.number.isRequired
};
