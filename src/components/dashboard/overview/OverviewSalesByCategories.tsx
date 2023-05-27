import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';
import { Box, Card, CardHeader, Divider, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Scrollbar from '../../Scrollbar';

const data = {
  series: [
    {
      data: [18, 24, 36, 42, 48, 52, 64]
    }
  ],
  categories: [
    'Meyve Sebze',
    'İçecek',
    'Süt Kahvaltılık',
    'Deterjan Temizlik',
    'Kağıt Kozmetik',
    'Atıştırmalık',
    'Temel Gıda',
  ]
};

const OverviewSalesByCategories: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: ['#3C4693', '#7783DB', '#7783DB'],
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: false
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: data.categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -12,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };

  const chartSeries = data.series;

  return (
    <Card {...props}>
      <CardHeader
        subheader={(
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {format(new Date(), 'MM yyyy')}
          </Typography>
        )}
        title="Kategorilere göre satışlar"
      />
      <Divider />
      <Scrollbar>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2
          }}
        >
          <Chart
            height="300"
            options={chartOptions}
            series={chartSeries}
            type="bar"
          />
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default OverviewSalesByCategories;
