
export class User {
	constructor(
		public uid: string,
		public name: string = '',
		public displayName: string = '',
		public isGM: boolean,
		public goldCoins: number = 0,
		public gameList: Game[] = [],
		public picture: Picture = new Picture('', ''),
		public rating: Rating = Rating.THREE
		) {
			
		}
	}

enum Rating {
	ONE = 1,
	TWO,
	THREE,
	FOUR,
	FIVE
}

class Picture {
	constructor(
		public thumbnail: string,
		public image: string
	) {

	}
}

export class Game {
	constructor(
		public name: string
	) {

	}
}