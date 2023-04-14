import { useState } from 'react'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Fab,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { format, parseISO } from 'date-fns'

import ProfileCreate from './ProfileCreate'
import { Address, Gender, MaritalStatus, ProfileRead } from '../global/types'
import { axiosClient } from '../config'

interface Profile extends ProfileRead {}

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

const FIELD_TO_LABEL_MAPPING: { [key: string]: any } = {
  first_name: { label: 'First name', fmt: null, sx: {} },
  last_name: { label: 'Last name', fmt: null, sx: {} },
  suffix: { label: 'Suffix', fmt: null, sx: {} },
  gender: { label: 'Gender', fmt: null, sx: { textTransform: 'capitalize' } },
  contact_number: { label: 'Contact #', fmt: null, sx: {} },
  marital_status: {
    label: 'Marital status',
    fmt: null,
    sx: { textTransform: 'capitalize' },
  },
  email: { label: 'Email', fmt: null, sx: {} },
  created_at: {
    label: 'First attend',
    fmt: (value: string) => format(parseISO(value), 'MMM M, Y'),
    sx: {},
  },
  address: {
    label: 'Address',
    fmt: (address: Address | null) => {
      const ordering = [
        'unit_number',
        'street',
        'purok',
        'brgy',
        'municipality',
        'province',
      ]
      if (!address) {
        return null
      }
      return ordering
        .map((key) => address[key])
        .filter((value) => !!value)
        .join(', ')
    },
    sx: {},
  },
}

const DEFAULT_MARITAL_STATUS: MaritalStatus = ''
const DEFAULT_GENDER: Gender | null = ''

const DEFAULT_VALUES = {
  id: 0,
  first_name: '',
  last_name: '',
  suffix: '',
  birth_date: '',
  marital_status: DEFAULT_MARITAL_STATUS,
  gender: DEFAULT_GENDER,
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
  created_at: '',
  updated_at: '',
}

export const ProfileList = () => {
  const queryClient = useQueryClient()

  const [viewAddProfileForm, setViewAddProfileForm] = useState(false)
  const [formInitialValue, setFormInitialValue] =
    useState<Profile>(DEFAULT_VALUES)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const deleteMutation = useMutation(
    async (id: string) => await axiosClient.delete(`/profiles/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries('profiles'),
    }
  )
  const { isLoading, isError } = useQuery(
    'profiles',
    async () => await axiosClient.get('/profiles'),
    {
      enabled: true,
      onSuccess: (res: AxiosResponse<Profile[]>) => setProfiles(res.data),
    }
  )

  return (
    <Container>
      {profiles.map((profile) => (
        <Accordion
          key={profile.id}
          variant="outlined"
          sx={{
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap="1rem">
              <Avatar
                {...stringAvatar(`${profile.first_name} ${profile.last_name}`)}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>
                  {profile.first_name} {profile.last_name} {profile.suffix}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {format(parseISO(profile.created_at), 'MMM M, Y')}
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(FIELD_TO_LABEL_MAPPING).map((key) => {
              const title = FIELD_TO_LABEL_MAPPING[key]['label']
              const value = FIELD_TO_LABEL_MAPPING[key]['fmt']
                ? FIELD_TO_LABEL_MAPPING[key]['fmt'](profile[key])
                : profile[key]
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  key={key}
                  sx={{ marginBottom: '0.8rem' }}
                >
                  <Typography variant="body2" sx={{ marginRight: '1.5rem' }}>
                    {title}:
                  </Typography>
                  <Typography
                    variant="body2"
                    textAlign="right"
                    sx={FIELD_TO_LABEL_MAPPING[key].sx}
                  >
                    {value || '-'}
                  </Typography>
                </Box>
              )
            })}
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="outlined"
              onClick={() => {
                const initialData = { ...profile }
                Object.keys(initialData).forEach(
                  (k) => (profile[k] = profile[k] || '')
                )
                setFormInitialValue(profile)
                setViewAddProfileForm(true)
              }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteMutation.mutate(profile.id.toString())}
            >
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: '5%', right: '5%' }}
        onClick={() => setViewAddProfileForm(true)}
      >
        <AddIcon />
      </Fab>
      {viewAddProfileForm && (
        <ProfileCreate
          onCloseHandler={() => setViewAddProfileForm(false)}
          initialData={formInitialValue}
        ></ProfileCreate>
      )}
    </Container>
  )
}
