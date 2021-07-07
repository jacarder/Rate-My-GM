import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/data.model';
import * as firebase from 'firebase';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import _ from "lodash";

const APIUtils = {
	getGMList: (query = '', limit = 20): Observable<User[]> => {
		let firebaseRef = firebase.database().ref("User").orderByChild('name').startAt(query).endAt(`${query}\uf8ff`).once('value');
		
		return from(firebaseRef).pipe(
			map(
				(val) => {
					let list = val.val();
					let arrayList: Array<User> = [];
					_.each(list, (user: User, key) => {
						arrayList.push(user)
					})
					return arrayList;
				}
			),
			/*
			switchMap((userList: User[]) => {
					let firebaseStorageRef = firebase.storage().ref('/' + "oddball-2020-new-sig.png").getDownloadURL();
					return from(firebaseStorageRef).pipe(
						switchMap(
							(downloadUrl) => {
								let arrayList: Array<User> = [];
								_.each(userList, (user: User, key) => {
									user.picture.thumbnail = downloadUrl;
									arrayList.push(user)				
								})
								return of(arrayList)
							}
						)
					)
				}
			)
			*/
		)
	},
	setUser: (user: User): void => {
		let firebaseRef = firebase.database().ref();
		firebaseRef.child("User").child(user.uid).set(user)
	}
}

export default APIUtils