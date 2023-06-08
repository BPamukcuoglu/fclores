import { useState } from 'react';
import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Tooltip,
  Typography
} from '@material-ui/core';
import type { CardProps } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InformationCircleIcon from '../../../icons/InformationCircle';
import PropTypes from 'prop-types';

const colorCodes = [
  '#FFC107',
  '#9C27B0',
  '#00BCD4',
  '#4CAF50',
  '#F44336',
  '#E91E63',
  '#03A9F4'
];

const AnalyticsYearlyComparisonByLecture: FC<any> = ({ reports }) => {
  const theme = useTheme();
  console.log("11", reports)

  function formatNumbers(array) {
    return array.map((value) => {
      if (typeof value === 'number') {
        return +value.toFixed(2);
      }
      return value;
    });
  }

  const formattedData = reports.map((obj) => ({
    year: obj.semester,
    course: obj.department.concat(obj.course),
    clos: JSON.parse(obj.clo).surveyCLOs || [],
  }));

  const [selectedSeries, setSelectedSeries] = useState([...new Set(reports.map((dat) => (dat.department.concat(dat.course).concat("/").concat(dat.semester))))]);
  const data = {
    series: [],
    xaxis: { dataPoints: [] }
  }
  console.log("********", formattedData)

  formattedData.forEach((obj, index) => {
    console.log(obj)
    data.series.push({
      name: obj.course.concat("/").concat(obj.year),
      color: colorCodes[index % 6],
      data: obj.clos.map((clo) => Number(clo))
    })
  })

  formattedData[0]?.clos.forEach((_, index) => {
    data.xaxis.dataPoints.push(index + 1);
  })

  console.log("***********", data)

  const handleChange = (event, name: string) => {
    if (!event.target.checked) {
      setSelectedSeries(selectedSeries.filter((item) => item !== name));
    } else {
      setSelectedSeries([...selectedSeries, name]);
    }
  };

  const chartSeries = data.series.filter((item) => selectedSeries.includes(item.name));

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      }
    },
    colors: chartSeries.map((item) => item.color),
    dataLabels: {
      enabled: true
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
          show: true,
        }
      }
    },
    legend: {
      show: false
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2
      },
      radius: 2,
      shape: 'circle',
      size: 4,
      strokeWidth: 0
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      tickPlacement: 'on',
      axisBorder: {
        color: theme.palette.divider
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: data.xaxis.dataPoints,
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: [
      {
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      {
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        },
        opposite: true
      }
    ]
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        title={(
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Yearly Comparison of Collective ASDJKLJASLKD Assesstment from Surveys and Grades Report
            </Typography>
            <Tooltip title="In this graph you can find the yearly comparison of  collective CLO assesstment based on student surveys and grades. On the X axis you can find the performance criterias, on the Y axis you can find the outcomes.">
              <InformationCircleIcon fontSize="small" />
            </Tooltip>
          </Box>
        )}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          px: 2
        }}
      >
        {data.series.map((item) => (
          <Box
            key={item.name}
            sx={{
              alignItems: 'center',
              display: 'flex',
              mr: 2
            }}
          >
            <Checkbox
              checked={selectedSeries.some((visibleItem) => visibleItem === item.name)}
              color="primary"
              onChange={(event) => handleChange(event, item.name)}
            />
            <Box
              sx={{
                backgroundColor: item.color,
                borderRadius: '50%',
                height: 8,
                ml: 1,
                mr: 2,
                width: 8
              }}
            />
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Chart
        height="442"
        options={chartOptions}
        series={chartSeries}
        type="line"
      />
    </Card>
  );
};

export default AnalyticsYearlyComparisonByLecture;

AnalyticsYearlyComparisonByLecture.propTypes = {
  reports: PropTypes.array.isRequired,
};
