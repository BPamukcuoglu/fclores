import { useCallback, useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { reportApi } from '../../apis/reportApi';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import DownloadIcon from '../../icons/Download';
import useSettings from '../../hooks/useSettings';
import { Report } from 'src/types/report';
import ExcelToTable from 'src/components/ExcelToTable';
import Clipboard from 'src/icons/Clipboard';
import Clock from 'src/icons/Clock';
import { blockchainApi } from '../../apis/blockchainApi';
import X from 'src/icons/X';
import toast from 'react-hot-toast';

const tabs = [
  { label: 'CLO Surveys', value: 'cloSurveys' },
  { label: 'CLO Weights', value: 'cloWeights' },
  { label: 'PC Weights', value: 'pcWeights' },
  { label: 'Grades', value: 'grades' },
  { label: 'Discretization', value: 'discretization' }
];

const ReportDetails: FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [report, setReport] = useState<Report | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('cloSurveys');
  const [excelData, setExcelData] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [singleLatex, setSingleLatex] = useState<any>("");

  const dataCloSurveys = excelData?.find((a) => a.name === "clo-surveys").data
  const dataPCWeights = excelData?.find((a) => a.name === "PC-weights").data
  const dataCLOWeights = excelData?.find((a) => a.name === "CLO-weights").data
  const dataDiscretization = excelData?.find((a) => a.name === "discretization").data
  const dataGrades = excelData?.find((a) => a.name === "grades").data

  const getReport = useCallback(async () => {
    try {
      const id = window.location.pathname.split('/').reverse()[0]
      const data = await reportApi.getReport(Number(id));

      setExcelData(JSON.parse(data.excelRaw))

      if (mounted.current) {
        setReport(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleTimestamp = async () => {
    await blockchainApi.certify(report.checksum, report.id);
  }

  const handleVerify = async () => {
    await blockchainApi.verify(report.txnId);
  }

  const handleDownload = () => {
    const content = singleLatex;
    const filename = "latex-template.tex";
    const blob = new Blob([content], { type: 'text/x-latex' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  const handleLatex = async () => {
    const latexString = await reportApi.getLatexSingle([report.semester], [report.department.concat(report.course)], 'pc');
    if (latexString.report) {
      setSingleLatex(latexString.report)
      setIsDialogOpen(true);
    }
  }

  if (!report) {
    return null;
  }

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
            zIndex: 5000,
            overflow: "hidden"
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
              width: '80%',
              padding: '20px',
              zIndex: 5000,
              overflow: "hidden"
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
            <Button
              color="primary"
              startIcon={<Clipboard fontSize="small" />}
              sx={{ m: 1 }}
              variant="text"
              onClick={() => { navigator.clipboard.writeText(singleLatex); toast.success("Copied!") }}
            >
              Copy
            </Button>
            <Button
              color="primary"
              startIcon={<DownloadIcon fontSize="small" />}
              sx={{ m: 1 }}
              variant="text"
              onClick={handleDownload}
            >
              Download
            </Button>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1,
                mt: 2,
                overflow: "hidden"
              }}
            >
              <Input
                style={{ overflow: "hidden" }}
                fullWidth
                maxRows={20}
                multiline
                disabled
                value={singleLatex}
              />
            </Box>
          </Box>
        </Box>
      )}
      <Helmet>
        <title>Report Details</title>
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
                {report.semester.concat(` / ${report.department} ${report.course}`)}
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
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  variant="subtitle2"
                  to="/dashboard/reports"
                >
                  Reports
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Report
                </Typography>
              </Breadcrumbs>
              {report.status === "timestamped" && (
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  TxnId: {report.txnId}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<Clipboard fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  onClick={handleLatex}
                >
                  Generate LaTeX Template
                </Button>
                {report.status === "pending" && (
                  <Button
                    color="primary"
                    startIcon={<Clock fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                    onClick={handleTimestamp}
                  >
                    Timestamp
                  </Button>
                )}
                {report.status === "timestamped" && (
                  <Button
                    color="primary"
                    startIcon={<Clock fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                    onClick={handleVerify}
                  >
                    Verify Timestamp
                  </Button>
                )}
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  onClick={window.print}
                >
                  Export
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'cloSurveys' && (
              <ExcelToTable
                data={dataCloSurveys}
                title="CLO Surveys"
              />
            )}
            {currentTab === 'cloWeights' && (
              <ExcelToTable
                data={dataCLOWeights}
                title="CLO Weights"
              />
            )}
            {currentTab === 'discretization' && (
              <ExcelToTable
                data={dataDiscretization}
                title="Discretization"
              />
            )}
            {currentTab === 'pcWeights' && (
              <ExcelToTable
                data={dataPCWeights}
                title="PC Weights"
              />
            )}
            {currentTab === 'grades' && (
              <ExcelToTable
                data={dataGrades}
                title="Grades"
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ReportDetails;
