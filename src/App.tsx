import { useState } from 'react'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { ProfileList } from './components/ProfileList'
import TopBar from './components/layout/TopBar'
import SideBar from './components/layout/SideBar'

const queryClient = new QueryClient()

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TopBar onToggleSideNav={handleDrawerToggle} />
        <SideBar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <div
          style={{ marginTop: '100px', marginBottom: '200px', width: '100%' }}
        >
          <Outlet />
        </div>
      </Box>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <ProfileList />,
      },
    ],
  },
])

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
