import type { FC } from 'react';
import numeral from 'numeral';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '../../../icons/ArrowRight';

interface StoreCampaign {
  id: number;
  name: string;
  color: string;
}

const campaigns: StoreCampaign[] = [
  {
    id: 21500,
    name: 'Bahar Şenliği %10',
    color: '#6C76C4',
  },
  {
    id: 21504,
    name: 'Bahar Şenliği %20',
    color: '#FF76C4',
  },
  {
    id: 31452,
    name: 'Gece Yarısı Fırsatları %10',
    color: '#6CFFC4',
  },
  {
    id: 31454,
    name: 'Gece Yarısı Fırsatları %20',
    color: '#6C22FF',
  },
  {
    id: 31454,
    name: 'Gece Yarısı Fırsatları %30',
    color: '#FFCDCD',
  },
];

const OverviewTotalBalance: FC = (props) => (
  <Card {...props}>
    <CardHeader
      title="Katılabileceğiniz Kampanyalar"
    />
    <Divider sx={{ mb: 2 }} />
    <CardContent>
      <List
        disablePadding
        sx={{ pt: 2 }}
      >
        {campaigns.map((campaign) => (
          <ListItem
            disableGutters
            key={campaign.name}
            sx={{
              pb: 2,
              pt: 0
            }}
          >
            <ListItemText
              disableTypography
              primary={(
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    variant="dot"
                    sx={{
                      pl: '20px',
                      '& .MuiBadge-badge': {
                        backgroundColor: campaign.color,
                        left: 6,
                        top: 11
                      }
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {campaign.name}
                    </Typography>
                  </Badge>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    {campaign.id}
                  </Typography>
                </Box>
              )}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
    <CardActions
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          variant="text"
        >
          Kampanyalara git
        </Button>
      </Box>
    </CardActions>
  </Card>
);

export default OverviewTotalBalance;
