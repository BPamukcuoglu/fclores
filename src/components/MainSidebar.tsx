import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Chip, Drawer, Link } from '@material-ui/core';
import type { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Logo from './Logo';

interface MainSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={!lgUp && openMobile}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
          width: 256
        }
      }}
    >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default MainSidebar;
