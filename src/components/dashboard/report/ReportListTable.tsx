import { useState } from 'react';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '../../../icons/ArrowRight';
import type { Report, ReportStatus } from '../../../types/report';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import Clock from 'src/icons/Clock';
import Clipboard from 'src/icons/Clipboard';

interface ReportListTableProps {
  reports: Report[];
}

interface Filters {
  status?: ReportStatus;
}

const statusOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Timestamped',
    value: 'timestamped'
  },
  {
    label: 'Pending',
    value: 'pending'
  }
];

const sortOptions = [
  {
    label: 'Newest first',
    value: 'createdAt|desc'
  },
  {
    label: 'Oldest first',
    value: 'createdAt|asc'
  }
];

const getStatusLabel = (reportStatus: ReportStatus): JSX.Element => {
  const map = {
    timestamped: {
      color: 'success',
      text: 'Timestamped'
    },
    pending: {
      color: 'warning',
      text: 'Pending'
    }
  };

  const { text, color }: any = map[reportStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyFilters = (
  reports: Report[],
  query: string,
  filters: Filters
): Report[] => reports?.filter((report) => {
  let matches = true;

  if (filters.status && report.status !== filters.status) {
    matches = false;
  }

  return matches;
});

const applyPagination = (
  reports: Report[],
  page: number,
  limit: number
): Report[] => reports
  .slice(page * limit, page * limit + limit);

const ReportListTable: FC<ReportListTableProps> = (props) => {
  const { reports, ...other } = props;
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => (
      {
        ...prevFilters,
        status: value
      }
    ));
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSort(event.target.value);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredReports = applyFilters(reports, query, filters);
  const paginatedReports = applyPagination(filteredReports, page, limit);

  return (
    <Card {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Status"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || 'all'}
            variant="outlined"
          >
            {statusOptions.map((statusOption) => (
              <option
                key={statusOption.value}
                value={statusOption.value}
              >
                {statusOption.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Department
                </TableCell>
                <TableCell>
                  Course Code
                </TableCell>
                <TableCell>
                  Semester
                </TableCell>
                <TableCell>
                  Instructor
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell align="right">
                  Created At
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReports.map((report) => {
                const isReportSelected = selectedReports.includes(report.id.toString());

                return (
                  <TableRow
                    hover
                    key={report.id}
                    selected={isReportSelected}
                  >
                    <TableCell>
                      {report.department}
                    </TableCell>
                    <TableCell>
                      {report.course}
                    </TableCell>
                    <TableCell>
                      {report.semester}
                    </TableCell>
                    <TableCell>
                      {report.instructor}
                    </TableCell>
                    <TableCell>
                      {getStatusLabel(report.status)}
                    </TableCell>
                    <TableCell>
                      {report.id}
                    </TableCell>
                    <TableCell align="right">
                      {format(report?.createdAt, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Generate LaTeX Template">
                        <IconButton
                          component={RouterLink}
                          to={"/dashboard/reports/".concat(report.id.toString())}
                        >
                          <Clipboard fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Timestamp">
                        <IconButton
                          component={RouterLink}
                          to={"/dashboard/reports/".concat(report.id.toString())}
                        >
                          <Clock fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Go to Details">
                        <IconButton
                          component={RouterLink}
                          to={"/dashboard/reports/".concat(report.id.toString())}
                        >
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={filteredReports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ReportListTable.propTypes = {
  reports: PropTypes.array.isRequired
};

export default ReportListTable;
