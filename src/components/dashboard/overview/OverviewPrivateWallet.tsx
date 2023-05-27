import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import numeral from 'numeral';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import ArrowRightIcon from '../../../icons/ArrowRight';
import ChevronDownIcon from '../../../icons/ChevronDown';

const OverviewPrivateWallet: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#27c6db'],
    labels: [''],
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: false
          }
        },
        hollow: {
          size: '60%'
        },
        track: {
          background: theme.palette.background.default
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [100];

  return (
    <Card {...props}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Chart
          height="160"
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          width="160"
        />
        <Box
          sx={{
            display: 'flex',
            flex: 1
          }}
        >
          <div>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {/* eslint-disable-next-line */}
              {numeral(158954.58).format('0,0.00')} {' TL'}
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mt: 1 }}
              variant="subtitle2"
            >
              Tüm Satışlarınızın Toplamı
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            sx={{
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              color: 'error.main'
            }}
            variant="rounded"
          >
            <ChevronDownIcon fontSize="small" />
          </Avatar>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          variant="text"
        >
          Tüm satışları göster
        </Button>
      </CardActions>
    </Card>
  );
};

export default OverviewPrivateWallet;
