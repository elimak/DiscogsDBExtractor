import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';


export default class GenresForm extends Component {
    static propTypes = {
        updateTitleArtistLabelQuery: PropTypes.function
    };

    state = {
        label: '',
        artist: '',
        title: ''
    };

    handleChange = (name, value) => {
        const state = Object.assign({}, this.state);
        this.setState({...this.state, [name]: value});

        state[name] = value;
        let query = '';

        Object.keys(state).forEach(key => {
            const keyAllowed = key === 'title' || key === 'artist' || key === 'label';
            if (keyAllowed && state[key].length > 0) {
                let escapedKey = state[key].split(' ').join('+');
                escapedKey = escape(escapedKey);
                query += `&${key}=${escapedKey}`;
            }
        });

        this.props.updateTitleArtistLabelQuery(query);
    };

    clearFilters() {
        this.setState({
            label: '',
            artist: '',
            title: ''
        });
        this.props.updateTitleArtistLabelQuery('');
    }

    render() {
        const cssStyles = require('../Home.scss');

        // <h3>By Title, Artist and/or Label</h3>

        return (
            <div className={cssStyles.flexBox_3}>
                <div className={cssStyles.cellsForm}>
                    <Input
                      type="text"
                      multiline={false}
                      label="Title"
                      maxLength={50}
                      value={this.state.title} onChange={this.handleChange.bind(this, 'title')} />
                </div>
                <div className={cssStyles.cellsForm}>
                    <Input
                        type="text"
                        multiline={false}
                        label="Artist"
                        maxLength={50}
                        value={this.state.artist} onChange={this.handleChange.bind(this, 'artist')} />
                </div>
                <div className={cssStyles.cellsForm}>
                    <Input
                        type="text"
                        multiline={false}
                        label="Label"
                        maxLength={50}
                        value={this.state.label} onChange={this.handleChange.bind(this, 'label')} />
                </div>
            </div>
        );
    }
}

