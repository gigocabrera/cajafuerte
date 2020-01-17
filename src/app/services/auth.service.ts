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

  private vaultUser;
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
        this.getVaultUser();
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

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  //
  // PERSONAL PROFILE
  //-----------------------------------------------------------------------
  getUserData() {
    return this.afAuth.auth.currentUser;
  }

  getUser() {
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
    user.uid = firebase.database().ref().child('vaults').push().key;
    if (user) {
      this.db.object('users/' + user.uid).update({vaultid : user.uid});
      this.db.object('vaults/' + user.uid + '/vaultusers/' + user.uid).update(vaultuser);
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

  //
  // RECENT
  //-----------------------------------------------------------------------
  async handleRecent(sourcekey, account, component) {

    const user = await this.getUser();

    let recent = {
      name: account.name, 
      sourcekey: sourcekey,
      component: component,
      dateCreated: this.timestamp
    };

    // Test for the existence of a Recent item within our data. If not found, add it
    if (account.recentid === undefined || account.recentid === '') {
      this.addRecentItem(sourcekey, recent, component);
      return;
    }

    // We have a recent item in our database, update timestamp
    this.vaultdata.child(user.uid + '/recent/' + account.recentid).update(recent);
  }

  async addRecentItem(sourcekey, recent, component) {

    const user = await this.getUser();

    // Create node under Recent and get the key
    let recentKey = this.vaultdata.child(user.uid + '/recent/').push().key;

    // Save key into correct node 
    switch(component) {
			case 'PasswordPage': 
        this.vaultdata.child(user.uid + '/accounts/' + sourcekey).update({ recentid : recentKey });
        break;
      case 'DriverLicensePage': 
        this.vaultdata.child(user.uid + '/driverlicenses/' + sourcekey).update({ recentid : recentKey });
        break;
      case 'BankAccountPage':
        this.vaultdata.child(user.uid + '/bankaccounts/' + sourcekey).update({ recentid : recentKey });
        break;
      case 'CreditCardPage':
        this.vaultdata.child(user.uid + '/creditcards/' + sourcekey).update({ recentid : recentKey });
        break;
		}

    // Save recent account
    this.vaultdata.child(user.uid + '/recent/' + recentKey + '/').update(recent);
  }

  getRecent() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/recent/', ref => ref.orderByChild('dateCreated')).valueChanges();
  }

  async deleteRecent() {
    const user = await this.getUser();
    this.vaultdata.child(user.uid + '/recent/').remove();
  }

  //
  // FAVORITES
  //-----------------------------------------------------------------------
  async handleFavorites(sourcekey, account, component) {

    const user = await this.getUser();

    let favorite = {
      name: account.name, 
      sourcekey: sourcekey,
      component: component,
      dateCreated: this.timestamp
    };

    // Test for the existence of a Favorite item within our data. If not found, add it
    if (account.favoriteid === undefined || account.favoriteid === '') {
      this.addFavoriteItem(sourcekey, favorite, component);
      return;
    }

    // We have a recent item in our database, update timestamp
    this.vaultdata.child(user.uid + '/favorites/' + account.favoriteid).update(favorite);
  }

  async addFavoriteItem(sourcekey, favorite, component) {

    const user = await this.getUser();

    // Create node under Favorites and get the key
    let favoriteKey = this.vaultdata.child(user.uid + '/favorites/').push().key;

    // Save key into correct node 
    switch(component) {
			case 'PasswordPage': 
        this.vaultdata.child(user.uid + '/accounts/' + sourcekey).update({ favoriteid : favoriteKey });
        break;
      case 'DriverLicensePage': 
        this.vaultdata.child(user.uid + '/driverlicenses/' + sourcekey).update({ favoriteid : favoriteKey });
        break;
      case 'BankAccountPage':
        this.vaultdata.child(user.uid + '/bankaccounts/' + sourcekey).update({ favoriteid : favoriteKey });
        break;
      case 'CreditCardPage':
        this.vaultdata.child(user.uid + '/creditcards/' + sourcekey).update({ favoriteid : favoriteKey });
        break;
		}

    // Save Favorite item
    this.vaultdata.child(user.uid + '/favorites/' + favoriteKey + '/').update(favorite);
  }

  async deleteFavorites() {
    const user = await this.getUser();
    this.vaultdata.child(user.uid + '/favorites/').remove();
  }

  async deleteFavorite(sourcekey, favkey, component) {
    
    const user = await this.getUser();

    this.vaultdata.child(user.uid + '/favorites/' + favkey).remove();
    switch(component) {
			case 'PasswordPage':
        this.vaultdata.child(user.uid + '/accounts/' + sourcekey + '/favoriteid/').remove();
        break;
      case 'DriverLicensePage': 
        this.vaultdata.child(user.uid + '/driverlicenses/' + sourcekey + '/favoriteid/').remove();
        break;
      case 'BankAccountPage':
        this.vaultdata.child(user.uid + '/bankaccounts/' + sourcekey + '/favoriteid/').remove();
        break;
      case 'CreditCardPage':
        this.vaultdata.child(user.uid + '/creditcards/' + sourcekey + '/favoriteid/').remove();
        break;
		}
  }

  getFavorites() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/favorites/', ref => ref.orderByChild('dateCreated')).valueChanges();
  }

}