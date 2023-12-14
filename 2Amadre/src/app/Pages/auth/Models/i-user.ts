import { Imovie } from "../../dashboard/models/imovie"

export interface iUser {
  id:         string
  nome:       string
  email:      string
  password:   string
  favorites:  Imovie[]
}
