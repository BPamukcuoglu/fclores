import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import type { DropzoneOptions } from 'react-dropzone';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import DuplicateIcon from '../icons/Duplicate';
import XIcon from '../icons/X';
import bytesToSize from '../utils/bytesToSize';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface FileDropzoneProps extends DropzoneOptions {
  files?: any[];
  onRemove?: (file: any) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  close?: any;
}

const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    close,
    ...other
  } = props;

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  const { user } = useAuth();

  const [selectedFile, setSelectedFile] = useState<any>();
  const [year, setYear] = useState<string>();
  const [semester, setSemester] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [code, setCode] = useState<string>();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (year && semester && department && code) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('courseCode', department.concat(code));
      formData.append('year', year);
      formData.append('instructor', user.name.split(' ').reverse()[0]);
      formData.append('semester', year.concat('-').concat(semester))

      axios.post('http://localhost:3000/reports/upload', formData)
        .then((response) => {
          close(false);
          toast.success("File uploaded succesfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("All fields are mandatory!")
    }
  };

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(
            isDragActive && {
              backgroundColor: 'action.active',
              opacity: 0.5
            }
          ),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5
          }
        }}
        {...getRootProps()}
      >
        <input
          {...getInputProps()}
          onChange={handleFileChange}
        />
        <Box
          sx={{
            '& img': {
              width: 100
            }
          }}
        >
          <img
            alt="Select file"
            src="/static/undraw_add_file2_gvbb.svg"
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            {`Select file${(
              maxFiles && maxFiles === 1
            ) ? '' : 's'}`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {`Drop file${(
                maxFiles && maxFiles === 1
              ) ? '' : 's'}`}
              {' '}
              <Link
                color="primary"
                underline="always"
              >
                browse
              </Link>
              {' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {selectedFile && (
        <Box
          sx={{
            mt: 2,
          }}
        >
          <ListItem
            key={selectedFile.path}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              '& + &': {
                mt: 1
              }
            }}
          >
            <ListItemIcon>
              <DuplicateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={selectedFile.name}
              primaryTypographyProps={{
                color: 'textPrimary',
                variant: 'subtitle2'
              }}
              secondary={bytesToSize(selectedFile.size)}
            />
            <Tooltip title="Remove">
              <IconButton
                edge="end"
                onClick={() => { setSelectedFile(null) }}
              >
                <XIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              p: 2,
              borderRadius: 1,
              mt: 2
            }}
          >
            <Grid container>
              <Grid
                item
                md={12}
                xs={12}
              >
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    item
                    sm={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Instructor"
                      variant="outlined"
                      value={user.name}
                      disabled
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Department"
                      variant="outlined"
                      onChange={(e) => { setDepartment(e.target.value) }}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Course Code"
                      variant="outlined"
                      onChange={(e) => { setCode(e.target.value) }}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Year"
                      helperText="####-####"
                      variant="outlined"
                      onChange={(e) => { setYear(e.target.value) }}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Semester"
                      helperText="FALL/SPRING/SUMMER"
                      variant="outlined"
                      onChange={(e) => { setSemester(e.target.value) }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2
            }}
          >
            <Button
              color="primary"
              onClick={handleFileUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
  close: PropTypes.func
};

FileDropzone.defaultProps = {
  files: []
};

export default FileDropzone;
