import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
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
import ChevronUpIcon from '../../../icons/ChevronUp';

const OverviewWeeklyEarnings: FC = (props) => {
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

  const chartSeries = [83];

  return (
    <Card {...props}>
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex'
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
              color="primary"
              variant="h4"
            >
              2459.68 TL
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mt: 1 }}
              variant="subtitle2"
            >
              Bu haftaki kazanç
            </Typography>
            <Typography
              variant="caption"
            >
              Haftalık satış hedefinize ulaşmanıza 440.32 TL kaldı!
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            sx={{
              backgroundColor: alpha(theme.palette.success.main, 0.08),
              color: 'success.main'
            }}
            variant="rounded"
          >
            <ChevronUpIcon fontSize="small" />
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
          Bu haftaki tüm işlemleri göster
        </Button>
      </CardActions>
    </Card>
  );
};

export default OverviewWeeklyEarnings;
