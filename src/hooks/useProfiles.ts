import { useState } from 'react'
import { useQuery } from 'react-query'

import { axiosClient } from '../config'
import { Profile } from '../global/types'

export default () => {
  const [profiles, setProfiles] = useState<Profile[]>([])

  const query = useQuery(
    'profiles',
    async () => await axiosClient.get<Profile[]>('/profiles')
  )

  return { ...query }
}
