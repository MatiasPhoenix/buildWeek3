import { Imovie } from "../../dashboard/models/imovie"

export interface iRegister {
  nome      : string
  email     : string
  password  : string
  favorites : Imovie[]
  username? : string
}
