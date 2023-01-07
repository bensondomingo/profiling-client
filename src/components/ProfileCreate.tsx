import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

interface inputData {
  firstName: string
  // lastName: string
}

interface Props {
  isOpen: boolean
  onCloseHandler: CallableFunction
}

const ProfileCreate = (props: Props) => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))
  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      birth_date: '',
      marital_status: '',
      gender: '',
      email: '',
      contact_number: '',
      address: {
        street: '',
        unit_number: '',
        purok: '',
        brgy: '',
        municipality: '',
        province: '',
      },
    },
  })

  const handleClose = () => {
    reset()
    props.onCloseHandler()
  }

  const handleSubmitForm = (data: inputData) => {
    console.log(data)
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      fullScreen={fullscreen}
      fullWidth={true}
    >
      <DialogTitle>Add a new Profile</DialogTitle>
      <DialogContent>
        <Box
          id="form"
          component="form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          <Typography>Basic Information</Typography>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="First name*"
                  placeholder="John"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Last name*"
                  placeholder="Doe"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="birth_date"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Birth Date"
                  placeholder="Doe"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Email address"
                  placeholder="john.doe@email.com"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="contact_number"
            control={control}
            rules={{
              minLength: {
                value: 11,
                message: 'Please enter a valid contact number',
              },
              maxLength: {
                value: 11,
                message: 'Please enter a valid contact number',
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Contact number"
                  placeholder="09XXXXXXXXX"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message || '11 digit contact number'
                  }
                  {...field}
                />
              </FormControl>
            )}
          />
          <Typography>Address</Typography>
          <Controller
            name="address.street"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Street"
                  placeholder="123 Mockingbird Lane"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.unit_number"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Unit #"
                  placeholder="Unit #1"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.purok"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Purok"
                  placeholder="Purok 1"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.brgy"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Barangay"
                  placeholder="Rizal"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.municipality"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="City/Municipality"
                  placeholder="Santiago City"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.province"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Province"
                  placeholder="Isabela"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" form="form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProfileCreate
