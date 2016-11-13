import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as discogsActions from 'redux/modules/discogs';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import styles from '../../data/styles';
const stateKey = 'spotify_auth_state';

@connect(state => ({discogsData: state.discogs.discogsData, loading: state.discogs.loading}), discogsActions)
export default class Home extends Component {
    static propTypes = {
        discogsData: PropTypes.object,
        search: PropTypes.func,
        loading: Boolean
    };

    state = {
        stylesAdded: [],
        stylesExcluded: [],
        params: []
    };

    componentWillMount() {
        this.setState({ params: this.getHashParams() });
    }

    getHashParams() {
        const hashParams = {};
        let e;
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (const i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    onLoginWithSpotify() {
        const client_id = '8a137d38ba9d46b9a2ca8528eca44bed'; // Your client id
        const redirect_uri = 'http://localhost:3000/home'; // Your redirect uri
        const state = this.generateRandomString(16);
        localStorage.setItem(stateKey, state);
        const scope = 'user-read-private user-read-email';
        const url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        window.location = url;
    }

    onSubmitQuery() {
        event.preventDefault();
        console.log(this.state);
        const queryAdded = this.state.stylesAdded.map((val) => {
            const noSpace = val.split(' ').join('+');
            return escape(noSpace);
        }).join('+');
        const queryExcluded = this.state.stylesExcluded.map((val) => {
            const noSpace = val.split(' ').join('+-');
            return escape(noSpace);
        }).join('+-');
        const queryStyle = `&style=${queryAdded}+-${queryExcluded}`;
        this.props.search(queryStyle);
    }

    handleStyleSelection(val, event) {
        if (event.currentTarget.id) {
            const stylesAdded = this.state.stylesAdded;
            stylesAdded.push(event.currentTarget.id);
            this.setState({stylesAdded});
        } else {
            this.setState({stylesAdded: val});
        }
    }

    handleStyleExclusionSelection(val, event) {
        if (event.currentTarget.id) {
            const stylesExcluded = this.state.stylesExcluded;
            stylesExcluded.push(event.currentTarget.id);
            this.setState({stylesExcluded});
        } else {
            this.setState({stylesExcluded: val});
        }
    }

    render() {
        const cssStyles = require('./Home.scss');
        const styleSources = styles.map((val) => val.style);

        return (<div className={cssStyles.home}>
               <Helmet title="Home"/>
               <h1>Home</h1>
                <div className={cssStyles.mainForm}>
                    <Autocomplete
                        direction="down"
                        selectedPosition="above"
                        label="Add style"
                        onChange={this.handleStyleSelection.bind(this)}
                        source={styleSources}
                        value={this.state.stylesAdded}
                    />
                    <Autocomplete
                        direction="down"
                        selectedPosition="above"
                        label="Exclude style"
                        onChange={this.handleStyleExclusionSelection.bind(this)}
                        source={styleSources}
                        value={this.state.stylesExcluded}
                    />
                    <Button raised primary label="Query Discogs" onClick={this.onSubmitQuery.bind(this)}/>
                </div>
                { this.props.loading && (
                    <ProgressBar mode="indeterminate"/>
                )}
                { this.props.discogsData && this.props.discogsData.length && (
                    <div><h3>This search found: { this.props.discogsData.length } records</h3></div>
                )}
                { this.props.discogsData && this.props.discogsData.length && ( this.props.discogsData.map((album) => {
                    return (<div>
                        <iframe src={`https://embed.spotify.com/?uri=spotify:album:${album.id}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                        <div className={cssStyles['card-body']}>
                            <h4>{album.artist.name} - {album.name}</h4>
                            <p className={cssStyles.pink}>{album.styles.join(', ')}</p>
                            <p className={cssStyles.blue}>{album.labels.join(', ')}</p>
                        </div>
                        <hr/>
                        </div>);
                }))}

                { this.props.discogsData && !this.props.discogsData.length && (
                    <p>There was no record found</p>
                )}
            </div>);
    }
}
