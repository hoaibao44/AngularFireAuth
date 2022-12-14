import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-rtdb',
  templateUrl: './rtdb.component.html',
  styleUrls: ['./rtdb.component.scss']
})
export class RtdbComponent implements OnInit,OnDestroy {
  userDatas:any[] = [];
  itemSub?:Subscription

  login:string | null = '' 
  password:string = ''

  items: Observable<any>


  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase, // this is the rtdbN
    public auth: AngularFireAuth
    ) {
    
    this.auth.user.subscribe(
      data => data ? this.login = data.displayName : this.login = 'Anonymous'
    )

    this.items = this.afs.collection('users').valueChanges();
  }
  
  ngOnInit(): void {
    this.itemSub =  this.items.subscribe(
      data => {
        this.userDatas = data,
        console.log(data)
      }
    )
  }

  // this is the rtdb
  addItem_rtdb(){
    const itemRef = this.db.object('item');
    itemRef.set({ name: this.login,value:this.password});
    console.log(`set ${this.login}`)
  }

  addItem_afs() {
    this.afs.collection('users').add({ login: this.login ,password:this.password})
  }

  ngOnDestroy(): void {
    this.itemSub?.unsubscribe()
    console.log('ended')    
  }
}
