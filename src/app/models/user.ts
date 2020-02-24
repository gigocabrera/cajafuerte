export interface UserCredential {
  email: string;
  password: string;
}

export interface UserProfile {
  email: string;
  fullName: string;
}

export interface User {
  datecreated: string, 
  email: string, 
  enabletouchid: string, 
  fullname: string, 
  nickname: string, 
  displayName: string, 
  profilepic: string, 
  photoURL: string, 
  paymentplan: string, 
  vaultid: string, 
  idToken: string, 
  lastsignin: string, 
  animation: string, 
  uid: string, 
  salesid: string
}