import React, { useState, Props } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import APIUtils from '../api/APIUtils';
import { User } from '../models/data.model';
import _ from 'lodash';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BehaviorSubject, iif, EMPTY } from 'rxjs'
import rxjsHelper from '../helpers/rxjs';
import { FontAwesome } from '@expo/vector-icons';
import { navigate } from './../Navigation';

let searchSubject = new BehaviorSubject('');

let searchResultObservable$ = searchSubject.pipe(	
	debounceTime(350),
	distinctUntilChanged(),
	switchMap(
		(val) => iif(() => val.length > 1, APIUtils.getGMList(val), EMPTY)
	)
);

//	TODO get those types. No anys
const SearchBarGM = () => {

	const [search, setSearch] = useState<string>('');
	const [gmListResults, setGmListResults] = useState<User[]>([]);

	rxjsHelper.useObservable(searchResultObservable$, setGmListResults);

	const updateSearch = (searchText: string) => {
		const formatSearch = searchText.toLowerCase();
		setSearch(formatSearch);
		//	If string is empty
		if(formatSearch.length === 0) {
			setGmListResults([])
		}
		searchSubject.next(formatSearch);
	};

	const gotoGMScreen = (gmItem: User) => {
		navigate('GameMaster', {gm: gmItem});
		updateSearch('');
	}

	const renderGm = (list: {item: User}) => (
		<ListItem bottomDivider onPress={() => gotoGMScreen(list.item)}>
			<Avatar title={list.item.displayName} source={{ uri: list.item.picture.thumbnail}}/>
			<ListItem.Content>
				<ListItem.Title>{list.item.displayName}</ListItem.Title>
				<ListItem.Subtitle>
					{
						Array.from(Array(list.item.rating)).map((star, i) => <FontAwesome key={i} name="star" color="gold"/>)
					}
				</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>			
	)

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar
				placeholder="Search for Game Master..."
				onChangeText={updateSearch}
				value={search}
			>
			</SearchBar>
			<FlatList
				data={gmListResults}
				renderItem={renderGm}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {

	}
})
export default SearchBarGM;