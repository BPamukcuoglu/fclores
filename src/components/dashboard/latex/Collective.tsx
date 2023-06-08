import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Input,
  TextField
} from '@material-ui/core';
import wait from '../../../utils/wait';
import PropTypes from 'prop-types';
import { reportApi } from 'src/apis/reportApi';
import X from 'src/icons/X';
import Clipboard from 'src/icons/Clipboard';
import DownloadIcon from 'src/icons/Download';

const CollectivePC: FC<any> = ({ field }) => {
  const reports = JSON.parse(window.localStorage.getItem("reports"));
  const [semesters, setSemesters] = useState<string>();
  const [latex, setLatex] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleRequest = async () => {
    const latexData = await reportApi.getLatexCollective(semesters.split(","), field)
    if (latexData.report) {
      setLatex(latexData.report)
      setIsDialogOpen(true);
    }
  }

  const handleDownload = () => {
    const content = latex;
    const filename = "latex-template.tex";
    const blob = new Blob([content], { type: 'text/x-latex' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
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
              onClick={() => { navigator.clipboard.writeText(latex); toast.success("Copied!") }}
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
                value={latex}
              />
            </Box>
          </Box>
        </Box>
      )}
      <Card>
        <CardHeader title={"Lecture ".concat(field.toUpperCase())} />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Semesters"
                variant="outlined"
                onChange={(e) => { setSemesters(e.target.value) }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            type="submit"
            variant="contained"
            onClick={handleRequest}
          >
            Generate LaTeX
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default CollectivePC;

CollectivePC.propTypes = {
  field: PropTypes.string
};
