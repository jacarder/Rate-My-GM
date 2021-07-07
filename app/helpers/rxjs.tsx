import { useEffect } from "react";

const rxjsHelper = {
	useObservable: (observable: any, setter: any) => {
		useEffect(() => {
			let subscription = observable
				.subscribe(
					(result: any) => {
						setter(result);
					}				
				)
			return () => subscription.unsubscribe();
		}, [observable, setter]);
	}
}
export default rxjsHelper