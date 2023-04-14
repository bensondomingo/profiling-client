import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { Controller, useForm, UseFormStateReturn } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { format } from 'date-fns'

import { ProfileBase } from '../global/types'
import { axiosClient } from '../config'

interface Profile extends ProfileBase {
  id?: number
}
interface ProfileSubmit extends Omit<Profile, 'birth_date'> {
  birth_date?: any
}
interface Props {
  onCloseHandler: CallableFunction
  initialData: Profile
}

interface UpdateMutationFnParam {
  id: number
  profile: Profile
}

const ProfileCreate = (props: Props) => {
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'))
  const queryClient = useQueryClient()
  const createMutation = useMutation(
    async (payload: Profile) => await axiosClient.post('/profiles', payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profiles')
        handleClose()
      },
    }
  )

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateMutationFnParam) =>
      await axiosClient.put(`/profiles/${data.id}`, data.profile),
    onSuccess: () => {
      queryClient.invalidateQueries('profiles')
      handleClose()
    },
  })

  const { handleSubmit, reset, control } = useForm<Profile, any>({
    defaultValues: props.initialData,
  })

  const handleClose = () => {
    reset()
    props.onCloseHandler()
  }

  const handleSubmitForm = (data: ProfileSubmit) => {
    Object.keys(data).forEach((key) => {
      let value = data[key] !== '' ? data[key] : null
      if (value && key in ['birth_date', 'first_attend'])
        value = data.birth_date?.$d?.toISOString()
      data[key] = value
    })
    console.log(data)
    if (props.initialData.id && props.initialData.id > 0)
      updateMutation.mutate({
        id: props.initialData.id,
        profile: data as Profile,
      })
    else createMutation.mutate(data as Profile)
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullScreen={fullscreen}
      fullWidth={true}
    >
      <DialogTitle>Add a new Profile</DialogTitle>
      <DialogContent>
        <Box
          id="form"
          component="form"
          onSubmit={handleSubmit((data: ProfileSubmit) =>
            handleSubmitForm(data)
          )}
        >
          <Typography>Basic Information</Typography>
          <Controller
            name="first_name"
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
            name="last_name"
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
            name="suffix"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Suffix"
                  placeholder="Jr/Sr"
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
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birth date"
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                    {...field}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <InputLabel id="gender-input">Gender</InputLabel>
                <Select id="gender-input" label="Gender" {...field}>
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="marital_status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <InputLabel id="marital-status-input">
                  Marital status
                </InputLabel>
                <Select
                  id="marital-status-input"
                  label="Marital status"
                  {...field}
                >
                  <MenuItem value={'single'}>Single</MenuItem>
                  <MenuItem value={'married'}>Married</MenuItem>
                  <MenuItem value={'separated'}>Separated</MenuItem>
                  <MenuItem value={'widowed'}>Widowed</MenuItem>
                </Select>
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
                  label="Email Address"
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
                  label="Contact Number"
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
            name="address.unit_number"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Building number"
                  placeholder="#46"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
            )}
          />
          <Controller
            name="address.street"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ marginY: '0.8rem' }}>
                <TextField
                  label="Street"
                  placeholder="Rizal Avenue"
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
