import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar, SwipeableDrawer, List, Divider, ListItem, ListItemButton, ListItemText,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { AuthContext } from '@/components/AuthProvider'
import { FormattedMessage } from 'react-intl'
import { Roles } from '@/utils/roles'
import PermissionGate from './PermissionGate'

const links = [
  {
    label: 'navbar.home',
    href: '/',
    roles: [Roles.Student, Roles.Teacher, Roles.Admin],
  },
  {
    label: 'navbar.assigning',
    href: '/assigning',
    roles: [Roles.Teacher, Roles.Admin],
  }
]

const settings = [
  {
    label: 'Profile',
    href: '/profile/edit',
  },
]

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleLogoutClick = () => {
    handleLogout()
    handleCloseUserMenu()
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {links.map((item) => (
          <PermissionGate key={item.href} roles={item.roles}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText>
                  <FormattedMessage id={item.label} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </PermissionGate>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              LOGO
            </Typography>

            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {links.map((link) => (
                <PermissionGate key={link.href} roles={link.roles}>
                  <Button
                    href={link.href}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    <FormattedMessage id={link.label} />
                  </Button>
                </PermissionGate>
              ))}
            </Box>

            {
              user ?
                (<Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{user.first_name[0] + user.last_name[0]}</Avatar>
                  </IconButton>

                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.href}
                        href={setting.href}
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>{setting.label}</Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem onClick={handleLogoutClick}>
                      <Typography textAlign='center'>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>) : null
            }
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} onOpen={handleDrawerToggle}>
        {drawer}
      </SwipeableDrawer>
    </>
  )
}
