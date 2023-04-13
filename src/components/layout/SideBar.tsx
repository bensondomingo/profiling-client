import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import PeopleIcon from '@mui/icons-material/People'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'

const drawerWidth = 240

interface Props {
  mobileOpen: boolean
  onClose: CallableFunction
}

export default function ResponsiveDrawer(props: Props) {
  const { mobileOpen, onClose } = props
  const { pathname } = useLocation()

  const paths = [
    {
      route: '/',
      name: 'Profiles',
    },
    {
      route: '/add',
      name: 'Add Profile',
    },
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {paths.map((path, index) => (
          <ListItem disablePadding key={index} component={Link} to={path.route}>
            <ListItemButton selected={pathname === path.route}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>{path.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => onClose()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
