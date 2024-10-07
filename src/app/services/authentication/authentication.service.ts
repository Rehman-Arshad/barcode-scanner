import { Injectable } from '@angular/core'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'


const firebaseConfig = {
  apiKey: 'AIzaSyADLdcEdEICHyW596pUmr3YQqco4-opqxo',
  authDomain: 'barcode-scanner-19e33.firebaseapp.com',
  projectId: 'barcode-scanner-19e33',
  storageBucket: 'barcode-scanner-19e33.appspot.com',
  messagingSenderId: '527468029299',
  appId: '1:527468029299:web:6f578ab1f490e8c8591106',
  measurementId: 'G-T5X4KYR7SE'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor () {}

  async registerUser (email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      await updateProfile(user, { displayName: displayName })
      return userCredential
    } catch (error) {
      throw error
    }
  }

  async loginUser (email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  async resetPassword (email: string) {
    try {
      return await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw error
    }
  }

  async signOut () {
    try {
      return await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  async getProfile () {
    try {
      const user = await auth.currentUser
      return user ? user.displayName || 'AbdulRehman' : 'AbdulRehman'
    } catch (error) {
      throw error
    }
  }
}
