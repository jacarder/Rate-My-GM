import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SearchBar, ListItem, Card, Avatar } from "react-native-elements";
import APIUtils from '../api/APIUtils';
import { User } from '../models/data.model';
import _ from 'lodash';
import { debounceTime, filter, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import rxjsHelper from '../helpers/rxjs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

let searchSubject = new BehaviorSubject('');
let searchResultObservable =  searchSubject.pipe(
	filter(val => val.length > 1),
	debounceTime(350),
	distinctUntilChanged(),
	mergeMap(val => APIUtils.getGMList(val))
);

const SearchBarGM = () => {
	
	const [search, setSearch] = useState<string>('');
	const [gmListResults, setGmListResults] = useState<User[]>([]);

	rxjsHelper.useObservable(searchResultObservable, setGmListResults);

	const updateSearch = (searchText: string) => {
		const formatSearch = searchText.toLowerCase();
		setSearch(formatSearch);
		//	If string is empty
		if(formatSearch.length === 0) {
			setGmListResults([])
		}
		searchSubject.next(formatSearch);
	};

	const renderGm = (list: {item: User}) => (
		<ListItem bottomDivider >
		<Avatar title={list.item.displayName} source={{ uri: list.item.picture.thumbnail}}/>
		<ListItem.Content>
			<ListItem.Title>{list.item.displayName}</ListItem.Title>
			<ListItem.Subtitle>
				{
					Array.from(Array(list.item.rating)).map((star, i) => <FontAwesomeIcon key={i} icon={faStar} color="gold"/>)
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