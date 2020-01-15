import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { FirebaseAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userauth;
  private userdata;
  private menudata;
  private submenudata;
  private vaultdata;
  private profilepicdata;
  private vaultpicdata;
  public salesid;

  defaultAvatar = 'https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png';
  user: {datecreated: string, email: string, enabletouchid: string, fullname: string, nickname: string, displayName: string, profilepic: string, photoURL: string, paymentplan: string, vaultid: string, idToken: string, lastsignin: string, animation: string, uid: string, salesid: string} = {
    datecreated: '', 
    email: '',
    enabletouchid: '', 
    fullname: '', 
    nickname: '', 
    displayName: '',
    profilepic: '',
    photoURL: '', 
    paymentplan: '',
    vaultid: '',
    idToken: '',
    lastsignin: '',
    animation: '',
    uid: '',
    salesid: ''
  };

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase) {
      //
      // instantiate firebase references
      //
      this.menudata = firebase.database().ref('/menu/');
      this.submenudata = firebase.database().ref('/submenu/');
      this.userdata = firebase.database().ref('/users/');
      this.vaultdata = firebase.database().ref('/vaults/');
      this.profilepicdata = firebase.storage().ref().child('/profilepics/');
      this.vaultpicdata = firebase.storage().ref().child('/vaultpics/');    
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(afUser => {
      afUser.user.getIdToken(false).then((token) => {
        this.user.idToken = token;
        this.user.uid = afUser.user.uid;
        console.log(token);
      })
      this.userauth = afUser;
    });
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(user => {
      console.log('reset pwd');
    });
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  //
  // sign up - create user
  //
  createInitialSetup() {
    this.createUserProfile();
    this.createVault();
  }

  async createUserProfile() {
    var profile = {
      datecreated: this.timestamp,
      lastsignin: this.timestamp,
      email: this.userauth.user.email,
      enabletouchid: 'false',
      fullname: this.user.fullname,
      nickname: this.user.nickname,
      profilepic: this.defaultAvatar,
      animation: 'fade-in-bottom',
      paymentplan: 'Free'
    };
    this.user.enabletouchid = profile.enabletouchid;
    this.user.profilepic = profile.profilepic;
    const user = await this.getUser();
    if (user) {
      this.db.object('users/' + user.uid).update(profile);
    }
  }

  async createVault() {
    const user = await this.getUser();
    var vaultuser = {
        isadmin: true,
        createdby: this.userauth.user.email,
        dateCreated: this.timestamp,
    };
    //
    // Create Vault and get the key
    //
    this.user.vaultid = firebase.database().ref().child('vaults').push().key;
    if (user) {
      this.db.object('users/' + user.uid).update({vaultid : this.user.vaultid});
      this.db.object('vaults/' + this.user.vaultid + '/vaultusers/' + user.uid).update(vaultuser);
    }
  }

  getMenu() {
    return this.db.list('forms').valueChanges();
  }

  getAnnoucement() {
    return this.db.object('announcement').valueChanges();
  }

  //
  // Move or copy a Firebase path to a new location
  // https://gist.github.com/katowulf/6099042
  copyFbRecord(oldRef, newRef) {
    oldRef.once('value', function(snap) {
      newRef.set( snap.val(), function(error) {
        if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
      });
    });
  }

}