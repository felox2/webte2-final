import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
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
  Tooltip,
  Avatar, SwipeableDrawer, List, Divider, ListItem, ListItemButton, ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const links = [
  {
    label: 'Home',
    href: '/dashboard',
  },
]

const settings = [
  {
    label: 'Profile',
    href: '/profile/edit',
  },
]

export default function Navbar() {
  const { auth } = usePage().props
  const user = (auth as any)?.user

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {links.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='lg'>
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
              component='a'
              href='/'
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
              component='a'
              href=''
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
                <Button
                  key={link.href}
                  href={link.href}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {link.label}
                </Button>
              ))}
            </Box>

            {
              user ?
                (<Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
                        LinkComponent={Link}
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>{setting.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>) :
                (<Box>

                </Box>)
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
