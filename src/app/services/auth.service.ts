import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { first } from 'rxjs/operators';
import 'firebase/database';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: User;
  userId: string;
  vaultUser: any;
  userdata;
  menudata;
  submenudata;
  vaultdata;
  profilepicdata;
  vaultpicdata;
  salesid;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {

    //
    // instantiate firebase references
    //
    this.menudata = db.database.ref('/menu/');
    this.submenudata = db.database.ref('/submenu/');
    this.userdata = db.database.ref('/users/');
    this.vaultdata = db.database.ref('/vaults/');
    //this.profilepicdata = firebase.storage().ref().child('/profilepics/');
    //this.vaultpicdata = db.storage().ref().child('/vaultpics/');    

  }

  login2(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(afUser => {
      afUser.user.getIdToken(false).then((token) => {
        //this.user.idToken = token;
        //this.user.uid = afUser.user.uid;
        //this.getVaultUser();
      })
    });
  }

  /* register(email, password, fullname) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((authData: any) => {
        this.userauth = authData;
        this.user.fullname = fullname;
        this.user.nickname = fullname;
        this.user.displayName = fullname;
        this.updateUserProfile(this.user);
        this.createInitialSetup();
        this.handleUserPresence();
        observer.next();
      }).catch((error: any) => {
        if (error) {
          observer.error(error);
          console.log(error);
        }
      });
    });
  } */

  async signup(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      const newUserCredential: firebase.auth.UserCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return newUserCredential;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getMenu() {
    return this.db.list('forms').valueChanges();
  }

  //
  // PERSONAL PROFILE
  //-----------------------------------------------------------------------
  getUserData() {
    return this.afAuth.currentUser;
  }

  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getVaultUser() {
    var that = this;
    var itemRef = this.db.object('/users/' + this.user.uid);
    itemRef.snapshotChanges().subscribe(action => {
      //console.log(action.key)
      //console.log(action.payload.val())
      this.vaultUser = action.payload.val();
    });
  }

  /* updateName(newname: string) {
    this.userdata.child(this.userauth.uid).update({'fullname' : newname});
    this.user.fullname = newname;
    this.user.displayName = newname;
    this.user.photoURL = this.userauth.photoURL;
    this.updateUserProfile(this.user); 
  } */

  /* updateUserProfile(user) {
    this.getUserData().updateProfile({
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL ? user.photoURL : this.defaultAvatar
    });
  }*/

}
