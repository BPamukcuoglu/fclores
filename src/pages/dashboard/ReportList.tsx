import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import { invoiceApi } from '../../__fakeApi__/invoiceApi';
import { InvoiceListTable } from '../../components/dashboard/report';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import DownloadIcon from '../../icons/Download';
import PlusIcon from '../../icons/Plus';
import UploadIcon from '../../icons/Upload';
import gtm from '../../lib/gtm';
import type { Invoice } from '../../types/invoice';
import FileDropzone from 'src/components/FileDropzone';
import X from 'src/icons/X';

const InvoiceList: FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getInvoices = useCallback(async () => {
    try {
      const data = await invoiceApi.getInvoices();

      if (mounted.current) {
        setInvoices(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <>
      {isDialogOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999
          }}
          onClick={() => { setIsDialogOpen(false) }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'background.default',
              width: '800px',
              padding: '20px',
              zIndex: 9999
            }}
            onClick={(e) => { e.stopPropagation() }}
          >
            <Button
              color="primary"
              startIcon={<X fontSize="small" />}
              sx={{ m: 1 }}
              variant="text"
              onClick={() => { setIsDialogOpen(false) }}
            >
              Close
            </Button>
            <FileDropzone />
          </Box>
        </Box>
      )}

      <Helmet>
        <title>Report List</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Accreditation Report List
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Reports
                </Typography>
              </Breadcrumbs>
              <Box
                sx={{
                  mb: -1,
                  mx: -1,
                  mt: 1
                }}
              >
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                  onClick={window.print}
                >
                  Export
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  onClick={() => { setIsDialogOpen(true) }}
                >
                  Add a New Report
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <InvoiceListTable invoices={invoices} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default InvoiceList;
