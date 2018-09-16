import React, { Component } from 'react';
import { Wave } from 'react-animated-text';


class Animation extends Component {

    render() {
        const text = this.props.text;

        return (
            <div className="animation">
                <Wave text={text} speed="7" effect="fadeOut" effectChange={3.0} />
            </div>
        );
    }

}

export default Animation;