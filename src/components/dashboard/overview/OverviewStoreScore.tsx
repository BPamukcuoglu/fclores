import type { FC } from 'react';
import Chart from 'react-apexcharts';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  useTheme,
  Divider,
  Typography,
} from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import ArrowRightIcon from '../../../icons/ArrowRight';

const OverviewStoreScore: FC = () => {
  const theme = useTheme()

  const chartOptions: ApexOptions = {
    series: [67],
    theme: {
      palette: "palette1"
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#333',
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "0px",
            color: theme.palette.primary.main,
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["StoreScore"]
  };

  const chartSeries = [83];

  return (
    <Card>
      <CardHeader title="Mağaza Skoru" />
      <Divider sx={{ mb: 2 }} />
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Chart
          height="240"
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          width="240"
        />
        <Typography variant="caption">
          Mağaza skorunuz 83. Durum: Çok İyi. Skorunuzu yükseltmek için siparişlerinizi hızla ve eksiksiz teslim etmeye özen gösterin. Ayrıca kampanyalarda yer almak mağaza skorunuzu olumlu etkileyecektir.
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        <Button
          color="primary"
          variant="text"
          endIcon={<ArrowRightIcon fontSize="small" />}
        >
          Detayları gör
        </Button>
      </CardActions>
    </Card>
  )
};

export default OverviewStoreScore;
