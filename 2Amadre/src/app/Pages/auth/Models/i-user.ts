import { Imovie } from "../../dashboard/models/imovie"

export interface iUser {
  id        : string
  nome      : string
  username  : string
  email     : string
  password  : string
  favorites : Imovie[]
}
