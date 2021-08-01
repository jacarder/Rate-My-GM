import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { User } from '../models/data.model';

import { RouteProp } from '@react-navigation/native';

//	Send to model for typing
type RootStackParamList = {
	Home: undefined;
	Profile: { userId: string };
	Feed: { sort: 'latest' | 'top' } | undefined;
  };

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};
//	END TYPES

//	Replace this type with something better defined in expo docs
type MyState = { value: string };
class GameMaster extends Component<Props, MyState> {
	constructor(props: any) {
		super(props);
		//this.state = {  };
	}
	_getGM = (): User => {
		return this.props.route.params.gm;
	}
	render() {
		return (
			<View>
				<Image 
					style={{width: 150, height: 150, alignSelf: "center"}}
					source={{uri: this._getGM().picture.image}}
					
				/>
				<Text>
					GameMaster Page
					{JSON.stringify(this._getGM())}
				</Text>
			</View>

		);
	}
}

export default GameMaster;