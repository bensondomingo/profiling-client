type MaritalStatus = 'single' | 'married' | 'separated' | 'widowed'
type Gender = 'male' | 'female'

export interface Profile {
  [index: string]: any
  id: number
  first_name: string
  last_name: string
  email?: string
  contact_number?: string
  address?: string
  marital_status?: MaritalStatus
  gender?: Gender
  created_at: string
  updated_at: string
}
