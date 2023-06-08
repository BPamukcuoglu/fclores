import type { FC } from 'react';
import numeral from 'numeral';
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
import ExternalLinkIcon from '../../../icons/ExternalLink';
import InformationCircleIcon from '../../../icons/InformationCircle';

interface PC {
  code: number;
  description: string;
}

const pcs: PC[] = [
  {
    code: 1,
    description: 'An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics. Knowledge of mathematics through differential and integral calculus and basic sciences.',
  },
  {
    code: 2,
    description: 'An ability to apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.',
  },
  {
    code: 3,
    description: 'An ability to communicate effectively with a range of audiences',
  },
  {
    code: 4,
    description: 'An ability to recognize ethical and professional responsibilities in engineering situations and make informed judgments, which must consider the impact of engineering solutions in global, economic, environmental, and societal contexts.',
  },
  {
    code: 5,
    description: 'An ability to function effectively on a team whose members together provide leadership, create a collaborative and inclusive environment, establish goals, plan tasks, and meet objectives.',
  },
  {
    code: 6,
    description: 'An ability to develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.',
  },
  {
    code: 7,
    description: 'An ability to acquire and apply new knowledge as needed, using appropriate learning strategies.',
  },
  {
    code: 8,
    description: 'Knowledge of probability and statistics, including applications appropriate to computer engineering',
  },
  {
    code: 9,
    description: 'An ability to identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics. Knowledge of mathematics through differential and integral calculus and basic sciences.',
  },
  {
    code: 10,
    description: 'Mastery in engineering topics (including computing science) necessary to analyze and design complex electrical and electronic devices, software, and systems containing hardware and software components',
  },
  {
    code: 11,
    description: 'Ability to apply knowledge of discrete mathematics',
  }
];

const AnalyticsListOfPC: FC = () => (
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
            List of Performance Criteria
          </Typography>
          <Tooltip title="At the list below you can find the PC codes and their description. For more detailed view please go to the Performance Criteria Page">
            <InformationCircleIcon fontSize="small" />
          </Tooltip>
        </Box>
      )}
    />
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            PC
          </TableCell>
          <TableCell>
            Description
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pcs.map((pc) => (
          <TableRow
            key={pc.code}
            sx={{
              '&:last-child td': {
                border: 0
              }
            }}
          >
            <TableCell>
              {pc.code}
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ExternalLinkIcon
                  fontSize="small"
                  sx={{
                    color: 'text.secondary',
                    cursor: 'pointer'
                  }}
                />
                <Typography
                  color="textPrimary"
                  sx={{ ml: 2 }}
                  variant="body2"
                >
                  { pc.description }
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default AnalyticsListOfPC;
