type MaritalStatus = 'single' | 'married' | 'separated' | 'widowed'
type Gender = 'male' | 'female'

export interface Address {
  [index: string]: any
  street?: string | null
  unit_number?: string | null
  purok?: string | null
  brgy?: string | null
  municipality?: string | null
  province?: string | null
}

export interface ProfileBase {
  [index: string]: any
  first_name: string
  last_name: string
  suffix?: string
  birth_date?: string
  email?: string
  contact_number?: string
  address?: Address
  marital_status?: MaritalStatus
  gender?: Gender
}

export interface ProfileAdd extends ProfileBase {}

export interface ProfileRead extends ProfileBase {
  id: number
  created_at: string
  updated_at: string
}
