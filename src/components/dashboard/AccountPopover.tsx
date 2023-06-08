import { useRef, useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  TextField,
  Typography
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
import CogIcon from '../../icons/Cog';
import useSettings from '../../hooks/useSettings';
import { THEMES } from '../../constants';

const getValues = (settings) => (
  {
    compact: settings.compact,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  }
);

const AccountPopover: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { settings, saveSettings } = useSettings();
  const [values, setValues] = useState(getValues(settings));

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (field, value): void => {
    setValues({
      ...values,
      [field]: value
    });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/authentication/login');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Avatar
          src={user?.avatar}
          sx={{
            height: 32,
            width: 32
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            {user?.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <MenuItem
            component={RouterLink}
            to="/dashboard/account"
          >
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Account
                </Typography>
              )}
            />
          </MenuItem>
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            onChange={(event): void => handleChange(
              'theme',
              event.target.value
            )}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option
                key={theme}
                value={theme}
              >
                {
                  theme
                    .split('_')
                    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                    .join(' ')
                }
              </option>
            ))}
          </TextField>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
