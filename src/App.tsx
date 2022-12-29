import { useState } from 'react'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Profiles } from './components/Profiles'
import TopBar from './components/layout/TopBar'
import SideBar from './components/layout/SideBar'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <Profiles />,
  },
])

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex' }}>
        <TopBar onToggleSideNav={handleDrawerToggle} />
        <SideBar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <div style={{ marginTop: '100px', width: '100%' }}>
          <RouterProvider router={router} />
        </div>
      </Box>
    </QueryClientProvider>
  )
}

export default App
