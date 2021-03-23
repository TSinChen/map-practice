import React, { Fragment } from 'react';
import { GlobalStyle } from './style';
import Map from './map';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<GlobalStyle />
				<Map />
			</Fragment>
		);
	}
}

export default App;
