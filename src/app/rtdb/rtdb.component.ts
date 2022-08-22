import { Component, OnDestroy, OnInit } from '@angular/core';
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
  // item$: Observable<any[]>;
  itemSub?:Subscription

  login:string = ''
  password:string = ''

  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>


  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase, // this is the rtdbN
    ) {
    // const myCollection = collection(firestore, 'users');
    // this.item$ = collectionData(myCollection);

    this.itemsCollection = afs.collection<any>('users');
    this.items = this.itemsCollection.valueChanges();
  }
  
  ngOnInit(): void {
    this.itemSub =  this.items.subscribe(
      data => this.userDatas = data
    )
  }

  // this is the rtdb
  addItem_rtdb(){
    const itemRef = this.db.object('item');
    itemRef.set({ name: this.login,value:this.password});
    console.log(`set ${this.login}`)
  }

  addItem_afs() {
    this.itemsCollection.add({ login: this.login, password:this.password});
  }

  ngOnDestroy(): void {
    this.itemSub?.unsubscribe()
    console.log('ended')    
  }
}
