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

  updateName(newname: string) {
    this.userdata.child(this.userauth.uid).update({'fullname' : newname});
    this.user.fullname = newname;
    this.user.displayName = newname;
    this.user.photoURL = this.userauth.photoURL;
    this.updateUserProfile(this.user); 
  }

  updateUserProfile(user) {
    this.getUserData().updateProfile({
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL ? user.photoURL : this.defaultAvatar
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

  deleteRecent() {
    this.vaultdata.child(this.vaultUser.vaultid + '/recent/').remove();
  }

  //
  // FAVORITES
  //-----------------------------------------------------------------------
  
  getFavorites() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/favorites/', ref => ref.orderByChild('dateCreated')).valueChanges();
  }

  deleteFavorites() {
    this.vaultdata.child(this.vaultUser.vaultid + '/favorites/').remove();
  }

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

  //
  // IMAGES
  //-----------------------------------------------------------------------
  getImages(key) {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/photos', ref => ref.orderByChild('key').equalTo(key)).valueChanges();
  }

  deleteImage(licensekey, photo) {
    this.vaultdata.child(this.vaultUser.vaultid + '/photos/' + photo.$key).remove();
    var picRef = firebase.storage().refFromURL(photo.photourl);
    picRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  }

  deleteStorageImage(photo) {
    var picRef = firebase.storage().refFromURL(photo.photourl);
    picRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log(error);
    });
  }

  saveImage (imageString, key) {
    this.uploadImage(imageString, '')
    .then((snapshot: any) => 
    {
      this.vaultdata.child(this.vaultUser.vaultid + '/photos/').push({ 'photourl' : snapshot.downloadURL, 'key': key });
    })
  }

  saveProfileImage (imageString, key) {
    this.uploadImage(imageString, 'profilepicture.jpg')
    .then((snapshot: any) => 
    {
      this.vaultdata.child(this.vaultUser.vaultid + '/photos/').push({ 'photourl' : snapshot.downloadURL, 'key': key });
      this.userdata.child(this.userauth.uid).update({ 'profilepic' : snapshot.downloadURL });
      this.user.displayName = this.user.displayName;
      this.user.photoURL = snapshot.downloadURL;
      //Luis - here
      //this.updateUserProfile(this.user);
    });
  }

  uploadImage(imageString, imageName) : Promise<any>
  {
    let dateName = this.timestamp + '.jpg',
      storageRef: any,
      parseUpload: any;
    
    let image = imageName === '' ? dateName : imageName;

    return new Promise((resolve, reject) => {
      storageRef = this.vaultpicdata.child(firebase.auth().currentUser.uid).child(image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => 
      {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
      (_err) => {
        reject(_err);
      },
      (success) => {
        resolve(parseUpload.snapshot);
      });
    });
  }

  updateEmailNode(newemail) {
    this.userdata.child(this.userauth.uid).update({'email' : newemail});
  }

  //
  // ACCOUNTS - PASSWORDS
  //-----------------------------------------------------------------------  
  getAllAccounts() {
    return this.vaultdata.child(this.vaultUser.vaultid + '/accounts').orderByChild('namelower');
  }
  
  getAccount(key) {
    return this.vaultdata.child(this.vaultUser.vaultid + '/accounts/' + key);
  }

  addAccount(item) {
    this.vaultdata.child(this.vaultUser.vaultid + "/accounts/").push(item);
  }

  deleteAccount(item) {

    // Delete recent item (if available)
    this.vaultdata.child(this.vaultUser.vaultid + '/recent/' + item.recentid).remove();

    // Delete favorite item (if available)
    this.vaultdata.child(this.vaultUser.vaultid + '/favorites/' + item.favoriteid).remove();

    // Delete account
    this.vaultdata.child(this.vaultUser.vaultid + '/accounts/' + item.$key).remove();
  }

  updateAccount(item, key) {
    this.vaultdata.child(this.vaultUser.vaultid + '/accounts/' + key).update({
      name: item.name, 
      namelower: item.namelower, 
      site: item.site, 
      number: item.number, 
      username: item.username, 
      password: item.password, 
      description: item.description,
      notes: item.notes
    });
  }

  //
  // DRIVER LICENSES - IDs
  //-----------------------------------------------------------------------  
  getAllDriverLicenses() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/driverlicenses', ref => ref.orderByChild('namelower')).valueChanges();
  }
  
  getDriverLicense(key) {
    return this.vaultdata.child(this.vaultUser.vaultid + '/driverlicenses/' + key);
  }
  
  getDriverLicensePhotos(key) {
    return this.vaultdata.child(this.vaultUser.vaultid + '/driverlicenses/' + key + '/photos/');
  }

  getDLKey() {
    return this.vaultdata.child(this.vaultUser.vaultid + "/driverlicenses/").push().key;
  }

  deleteDriverLicense(item) {

    // Delete recent items (if available)
    this.vaultdata.child(this.vaultUser.vaultid + '/recent/' + item.recentid).remove();

    // Get list of photos to delete from Storage
    this.vaultdata.child(this.vaultUser.vaultid + '/photos').once('value', (photos) => { 
      
      photos.forEach( snapshot => {
        let photo = snapshot.val();
        let $key = snapshot.key;

        // Get images for this particular item only
        if (item.$key === photo.key) {
          
          // Delete image from storare
          this.deleteStorageImage(photo);

          // Delete photo ref
          this.vaultdata.child(this.vaultUser.vaultid + '/photos/' + $key).remove();
        }
      })
    });

    // Delete DL
    this.vaultdata.child(this.vaultUser.vaultid + '/driverlicenses/' + item.$key).remove();

  }

  updateDriverLicense(item, key) {
    this.vaultdata.child(this.vaultUser.vaultid + '/driverlicenses/' + key).update({
      name: item.name, 
      namelower: item.namelower, 
      number: item.number, 
      issuedate: item.issuedate, 
      expirationdate: item.expirationdate, 
      state: item.state, 
      notes: item.notes,
      recentid: item.recentid
    });
  }

  //
  // BANK ACCOUNTS
  //-----------------------------------------------------------------------  
  getAllBankAccounts() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/bankaccounts', ref => ref.orderByChild('namelower')).valueChanges();
  }
  
  getBankAccount(key) {
    return this.vaultdata.child(this.vaultUser.vaultid + '/bankaccounts/' + key);
  }

  getBankKey() {
    return this.vaultdata.child(this.vaultUser.vaultid + "/bankaccounts/").push().key;
  }

  addBankAccount(item) {
    this.vaultdata.child(this.vaultUser.vaultid + "/bankaccounts/").push(item);
  }

  deleteBankAccount(item) {
    this.vaultdata.child(this.vaultUser.vaultid + '/bankaccounts/' + item.$key).remove();
  }

  updateBankAccount(item, key) {
    this.vaultdata.child(this.vaultUser.vaultid + '/bankaccounts/' + key).update({
      name: item.name, 
      namelower: item.namelower, 
      accounttype: item.accounttype,
      number: item.number, 
      routingnumber: item.routingnumber,
      owner: item.owner, 
      notes: item.notes,
      recentid: item.recentid
    });
  }

  //
  // CREDIT CARDS
  //----------------------------------------------------------------------- 
  getAllCreditCards() {
    return this.db.list('/vaults/' + this.vaultUser.vaultid + '/creditcards', ref => ref.orderByChild('namelower')).valueChanges();
  }
  
  getCreditCard(key) {
    return this.vaultdata.child(this.vaultUser.vaultid + '/creditcards/' + key);
  }

  getCCKey() {
    return this.vaultdata.child(this.vaultUser.vaultid + "/creditcards/").push().key;
  }

  /* AddCreditCard(item) {
    let key = this.vaultdata.child(this.vaultUser.vaultid + "/creditcards/").push().key;
    this.updateCreditCard(item, key);
    return key;
  } */

  deleteCreditCard(item) {

    // Delete recent items (if available)
    this.vaultdata.child(this.vaultUser.vaultid + '/recent/' + item.recentid).remove();
    
      // Get list of photos to delete from Storage
      this.vaultdata.child(this.vaultUser.vaultid + '/photos').once('value', (photos) => { 
        
        photos.forEach( snapshot => {
          let photo = snapshot.val();
          let $key = snapshot.key;
  
          // Get images for this particular item only
          if (item.$key === photo.key) {
            
            // Delete image from storare
            this.deleteStorageImage(photo);
  
            // Delete photo ref
            this.vaultdata.child(this.vaultUser.vaultid + '/photos/' + $key).remove();
          }
        })
      });
  
      // Delete DL
      this.vaultdata.child(this.vaultUser.vaultid + '/creditcards/' + item.$key).remove();
      
  }

  updateCreditCard(item, key) {
    this.vaultdata.child(this.vaultUser.vaultid + '/creditcards/' + key).update({
      owner: item.owner, 
      name: item.name, 
      namelower: item.namelower, 
      type: item.type,
      number: item.number, 
      expirationdate: item.expirationdate, 
      cvv: item.cvv,
      notes: item.notes,
      recentid: item.recentid
    });
  }

}