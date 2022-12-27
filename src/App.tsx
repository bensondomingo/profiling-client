import { useState } from 'react'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Profiles } from './components/Profiles'
import TopBar from './components/layout/TopBar'
import SideBar from './components/layout/SideBar'

const queryClient = new QueryClient()

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex' }}>
        <TopBar onToggleSideNav={handleDrawerToggle}></TopBar>
        <SideBar mobileOpen={mobileOpen} onClose={handleDrawerToggle}></SideBar>
      </Box>
    </QueryClientProvider>
  )
}

export default App
