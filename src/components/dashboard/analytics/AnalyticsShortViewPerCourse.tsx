import type { FC } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import InformationCircleIcon from '../../../icons/InformationCircle';
import PropTypes from 'prop-types';
import { Report } from 'src/types/report';

const calculateAverageCLO = (course: Report) => {
  const clos = JSON.parse(course.clo);
  let closTotal = 0;
  clos.surveyCLOs?.forEach((clo) => {
    closTotal += Number(clo);
  })

  return Number(closTotal / clos.surveyCLOs.length) || 0;
}

const AnalyticsShortViewPerCourse: FC<any> = ({ reports }) => {
  const instructorCourses = reports;

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
              Summary of Courses
            </Typography>
            <Tooltip title="This is a summary of average ABET scores of courses.">
              <InformationCircleIcon fontSize="small" />
            </Tooltip>
          </Box>
        )}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Department
            </TableCell>
            <TableCell>
              Code
            </TableCell>
            <TableCell align="right">
              Average Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructorCourses.map((course) => (
            <TableRow
              key={course.code}
            >
              <TableCell>
                <Typography
                  color="textPrimary"
                  sx={{ ml: 2 }}
                  variant="subtitle2"
                >
                  {course.department}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textPrimary"
                  sx={{ ml: 2 }}
                  variant="subtitle2"
                >
                  {course.course}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {calculateAverageCLO(course).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AnalyticsShortViewPerCourse;

AnalyticsShortViewPerCourse.propTypes = {
  reports: PropTypes.array.isRequired
};
