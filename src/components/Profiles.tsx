import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Profile } from '../global/types'

import { axiosClient } from '../config'
import { AxiosResponse } from 'axios'

export const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const { isLoading, isError } = useQuery(
    'profiles',
    async () => await axiosClient.get('/profiles'),
    {
      enabled: true,
      onSuccess: (res: AxiosResponse<Profile[]>) => setProfiles(res.data),
    }
  )

  return (
    <div>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.first_name} {profile.last_name}
          </li>
        ))}
      </ul>
    </div>
  )
}
