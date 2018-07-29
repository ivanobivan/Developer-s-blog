import {ThemeContext, themes} from '../../Theme/context';
import Button from './Button';
import React from 'react';

function Toolbar(props) {
	return (
		<Button onClick={props.changeTheme} value='TEST'/>
	);
}

class AboutMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: themes.light,
		};

		this.toggleTheme = () => {
			this.setState(state => ({
				theme:
                    state.theme === themes.dark
                    	? themes.light
                    	: themes.dark,
			}));
		};
	}

	render() {
		return (
			<div id="aboutMe__root">
				<ThemeContext.Provider value={this.state.theme}>
					<Toolbar changeTheme={this.toggleTheme}/>
				</ThemeContext.Provider>
				<div>
					<Button
						value='TEST'
					/>
				</div>
			</div>
		);
	}
}

export default AboutMe;