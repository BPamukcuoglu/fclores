import type { FC } from 'react';
import { format, subDays } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';

interface Action {
  id: string;
  amount: number;
  date: Date;
  sender: string;
  type: string;
}

const actions: Action[] = [
  {
    id: 'd46800328cd510a668253b45',
    amount: 250.96,
    date: new Date(),
    sender: 'Sehzade Online',
    type: 'order'
  },
  {
    id: 'b4b19b21656e44b487441c50',
    amount: 99.99,
    date: subDays(new Date(), 1),
    sender: 'Zingo',
    type: 'payment'
  },
  {
    id: '56c09ad91f6d44cb313397db',
    amount: 25.00,
    date: subDays(new Date(), 1),
    sender: 'Zingo',
    type: 'payment'
  },
  {
    id: 'aaeb96c5a131a55d9623f44d',
    amount: 119.85,
    date: subDays(new Date(), 3),
    sender: 'Sehzade Online',
    type: 'order'
  },
  {
    id: 'aaeb96c5a131a55d9623f44d',
    amount: 149.55,
    date: subDays(new Date(), 3),
    sender: 'Sehzade Online',
    type: 'order'
  }
];

const OverviewLatestTransactions: FC = (props) => (
  <Card {...props}>
    <CardHeader title="Son İşlemler" />
    <Divider />
    <Table>
      <TableBody>
        {actions.map((action) => (
          <TableRow
            key={action.id}
            sx={{
              '&:last-child td': {
                border: 0
              }
            }}
          >
            <TableCell width={100}>
              <Box sx={{ p: 1 }}>
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="subtitle2"
                >
                  {format(action.date, 'MM').toUpperCase()}
                </Typography>
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="h6"
                >
                  {format(action.date, 'd')}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <div>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {action.sender}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {
                    action.type === 'order'
                      ? 'Ödeme geldi'
                      : 'Ödeme yapıldı'
                  }
                </Typography>
              </div>
            </TableCell>
            <TableCell align="right">
              <Typography
                color={
                  action.type === 'order'
                    ? 'success.main'
                    : 'error.main'
                }
                variant="subtitle2"
              >
                {action.type === 'order' ? '+' : '-'}
                {' '}
                {numeral(action.amount).format('0,0.00')}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                TL
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default OverviewLatestTransactions;
