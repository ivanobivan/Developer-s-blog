import React from 'react'

export default class Chat extends React.Component {

    render() {
        return(
            <div id="chat__root">
                <h1>{this.props.text}</h1>
            </div>
        )
    }
}