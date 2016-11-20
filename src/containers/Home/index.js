import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import * as discogsActions from 'redux/modules/discogs';
import * as userActions from 'redux/modules/userInfo';
import * as spotifyActions from 'redux/modules/spotify';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import AlbumsFound from './components/AlbumsFound';
import PlaylistSummary from './components/PlaylistSummary';

import styles from '../../data/styles';

function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData,
        loadingDiscogs: state.discogs.loading,
        savingSpotify: state.spotify.saving,
        playlistInfo: state.spotify.playlist,
        playlistError: state.spotify.error,
        userData: state.userInfo.userData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        discogsActions: bindActionCreators(discogsActions, dispatch),
        spotifyActions: bindActionCreators(spotifyActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
    static propTypes = {
        discogsData: PropTypes.object,
        userData: PropTypes.object,
        playlistInfo: PropTypes.object,
        discogsActions: PropTypes.object,
        spotifyActions: PropTypes.object,
        userActions: PropTypes.object,
        loadingDiscogs: Boolean,
        savingSpotify: Boolean
    };

    state = {
        stylesAdded: [],
        stylesExcluded: [],
        params: {}
    };

    componentWillMount() {
        const params = this.getHashParams();

        if (!!params.access_token) {
            this.setState({ params });
            this.props.userActions.loadUserData(params.access_token);
        } else {
            this.props.spotifyActions.connectSpotify();
        }
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
        this.props.discogsActions.search(queryStyle);
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

    onLogout() {
        this.props.spotifyActions.connectSpotify(true);
    }

    render() {
        const cssStyles = require('./Home.scss');
        const styleSources = styles.map((val) => val.style);

        console.log(this.state);
        console.log('userData ', this.props.userData);
        console.log('playlistInfo ', this.props.playlistInfo);

        return (<div className={cssStyles.home}>
               <Helmet title="Home"/>
                <div>
                    <p>Logged as {this.props.userData.id}</p>
                    <Button label="Not you?" onClick={this.onLogout.bind(this)}/>
                </div>
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
                { this.props.loadingDiscogs && (
                    <ProgressBar mode="indeterminate"/>
                )}
                <AlbumsFound />
                <PlaylistSummary />
            </div>);
    }
}
