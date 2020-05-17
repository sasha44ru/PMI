export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface News {
  id?: string,
  title: string,
  shortDescription?: string,
  text: string,
  date: Date
}

export interface Applicants {
  undergraduateInfo: string,
  magistracyInfo: string,
  descriptionForMain: string
}

export interface About {
  text: string,
  descriptionForMain: string
}

export interface Contacts {
  contactPerson?: string,
  addInfo?: string,
  onePhone?: string,
  twoPhone?: string,
  oneEmail?: string,
  twoEmail?: string
}

export interface Employees {
  id?: string,
  lastName: string,
  firsName: string,
  patronymic: string,
  telephone?: string,
  eMail?: string,
  position?: string,
  photoFile?: string,
  photoFilePath?: string,
  shortDescriptionOne?: string,
  shortDescriptionTwo?: string,
  text?: string,
  imagePreview?: string | ArrayBuffer;
}

export interface FbCreateResponse {
  name: string
}
