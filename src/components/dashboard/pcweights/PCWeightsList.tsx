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
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '../../../icons/ArrowRight';
import PencilAltIcon from '../../../icons/PencilAlt';
import SearchIcon from '../../../icons/Search';
import type { Report, ReportStatus } from '../../../types/report';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

interface PCListTableProps {
  pcs: Report[];
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

const getStatusLabel = (invoiceStatus: ReportStatus): JSX.Element => {
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

  const { text, color }: any = map[invoiceStatus];

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
): Report[] => reports
  .filter((invoice) => {
    let matches = true;

    if (filters.status && invoice.status !== filters.status) {
      matches = false;
    }

    return matches;
  });

const applyPagination = (
  invoices: Report[],
  page: number,
  limit: number
): Report[] => invoices
  .slice(page * limit, page * limit + limit);

const PCWeightsList: FC<PCListTableProps> = (props) => {
  const { pcs: invoices, ...other } = props;
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
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

  const handleSelectOneInvoice = (
    event: ChangeEvent<HTMLInputElement>,
    invoiceId: string
  ): void => {
    if (!selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices((prevSelected) => [...prevSelected, invoiceId]);
    } else {
      setSelectedInvoices((prevSelected) => prevSelected.filter((id) => id !== invoiceId));
    }
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredInvoices = applyFilters(invoices, query, filters);
  const paginatedInvoices = applyPagination(filteredInvoices, page, limit);
  const enableBulkActions = selectedInvoices.length > 0;
  const selectedSomeInvoices = selectedInvoices.length > 0
    && selectedInvoices.length < invoices.length;
  const selectedAllInvoices = selectedInvoices.length === invoices.length;

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
      {enableBulkActions && (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              mt: '6px',
              position: 'absolute',
              px: '4px',
              width: '100%',
              zIndex: 2
            }}
          >
            <Checkbox
              checked={selectedAllInvoices}
              color="primary"
              indeterminate={selectedSomeInvoices}
            />
            <Button
              color="primary"
              sx={{ ml: 2 }}
              variant="outlined"
            >
              Delete
            </Button>
            <Button
              color="primary"
              sx={{ ml: 2 }}
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllInvoices}
                    color="primary"
                    indeterminate={selectedSomeInvoices}
                    onChange={handleSelectAllInvoices}
                  />
                </TableCell> */}
                <TableCell>
                  Department
                </TableCell>
                <TableCell>
                  Course Code
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => {
                const isInvoiceSelected = false;

                return (
                  <TableRow
                    hover
                    key={invoice.id}
                    selected={isInvoiceSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isInvoiceSelected}
                        color="primary"
                        onChange={(event): void => handleSelectOneInvoice(event, invoice.id)}
                        value={isInvoiceSelected}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Link
                        color="textPrimary"
                        component={RouterLink}
                        to="#"
                        underline="none"
                        variant="subtitle2"
                      >
                        {invoice.department}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        color="textPrimary"
                        component={RouterLink}
                        to="#"
                        underline="none"
                        variant="subtitle2"
                      >
                        {invoice.course}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {getStatusLabel(invoice.status)}
                    </TableCell>
                    <TableCell>
                      {invoice.id}
                    </TableCell>
                    <TableCell>
                      {format(invoice.createdAt, 'dd/MM/yyyy')}
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
        count={filteredInvoices.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PCWeightsList.propTypes = {
  pcs: PropTypes.array.isRequired
};

export default PCWeightsList;
