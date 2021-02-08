import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import styles from './Styles';

const Topbar = ({
  t,
  className,
  onSidebarOpen,
  onProfileMenuOpen,
  onMobileMenuClose,
  onMenuClose,
  onMobileMenuOpen,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  isMenuOpen,
  anchorEl,
  onProfileClick,
  onSignOutClick,
}) => {
  const classes = styles();

  const menuId = 'primary-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={onMenuClose}
    >
      <MenuItem onClick={onProfileClick}>{t('profile.label')}</MenuItem>
      <MenuItem onClick={onSignOutClick}>{t('signOut.label')}</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={onMobileMenuClose}
    >
      <MenuItem onClick={onProfileMenuOpen}>
        <IconButton aria-label={t('profile.label')} aria-controls={menuId} aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        {t('profile.label')}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={clsx(classes.appBar, className)}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label={t('profile.label')}
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={onProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label={t('showMore.label')} aria-controls={mobileMenuId} aria-haspopup="true" onClick={onMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default withTranslation()(Topbar);