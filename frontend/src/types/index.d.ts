export type DateTime = string

export type Nullable<T> = T | null

export interface User {
  id: number
  name: string
  username: string
  email: string
  email_verified_at: DateTime
  acronym: string
}

export interface ActionContext {
  request: Request
}
