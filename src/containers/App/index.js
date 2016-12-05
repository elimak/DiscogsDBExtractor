import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/userInfo';
import * as spotifyActions from 'redux/modules/spotify';
import { Button } from 'react-toolbox/lib/button';
import { browserHistory } from 'react-router';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';

const SpotifyIcon = () => (
    <svg viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000">
<g><g>
    <path d="M685.9,644.4c-163.1-75.4-391.4-42-401-40.6c-21.5,3.2-36.3,23.3-33,44.8c3.2,21.5,23.3,36.3,44.8,33c2.1-0.3,214.3-31.4,356.2,34.2c5.3,2.5,11,3.6,16.5,3.6c14.9,0,29.1-8.5,35.7-22.8C714.3,676.9,705.7,653.6,685.9,644.4z"/>
    <path d="M731.8,502.8c-185.2-85.6-444.9-47.7-455.9-46c-21.5,3.2-36.2,23.3-33,44.8c3.2,21.5,23.3,36.3,44.7,33c2.5-0.4,247.6-36,411.2,39.6c5.3,2.5,11,3.6,16.5,3.6c14.9,0,29.1-8.5,35.7-22.8C760.1,535.3,751.5,511.9,731.8,502.8z"/>
    <path d="M762.6,354.8C558,260.2,270.7,302.2,258.5,304c-21.5,3.2-36.2,23.3-33,44.8s23.3,36.3,44.7,33c2.7-0.4,276.4-40.2,459.3,44.4c5.3,2.5,11,3.6,16.5,3.6c14.9,0,29.1-8.5,35.7-22.8C790.9,387.3,782.3,363.9,762.6,354.8z"/>
    <path d="M500,10C229.8,10,10,229.8,10,500c0,270.2,219.8,490,490,490c270.2,0,490-219.8,490-490C990,229.8,770.2,10,500,10z M500,911.3C273.2,911.3,88.7,726.8,88.7,500C88.7,273.2,273.2,88.7,500,88.7c226.8,0,411.3,184.5,411.3,411.3C911.3,726.8,726.8,911.3,500,911.3z"/>
    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>
</g></g>
</svg>
);

function mapStateToProps(state) {
    return {
        userData: state.userInfo.userData,
        loginError: state.userInfo.error,
        loadedUser: state.userInfo.loaded,
        loadingUser: state.userInfo.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        spotifyActions: bindActionCreators(spotifyActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        userData: PropTypes.object,
        loginError: PropTypes.object,
        loadingUser: Boolean,
        loadedUser: Boolean,
        spotifyActions: PropTypes.object,
        userActions: PropTypes.object,
    };

    state = {
        params: {}
    };

    componentWillMount() {
        const params = this.getHashParams();

        console.log('token ', sessionStorage.getItem('token'));
        console.log('param ', params.access_token);
        console.log('loadingUser ', this.props.loadingUser);
        console.log('loadedUser ', this.props.loadedUser);

        if (sessionStorage.getItem('token') && !this.props.loadingUser && !this.props.loadedUser) {
            this.props.userActions.loadUserData(sessionStorage.getItem('token'));
            browserHistory.push('/');
        } else if (!!params.access_token) {
            this.setState({params});
            this.props.userActions.loadUserData(params.access_token);
            sessionStorage.setItem('token', params.access_token);
            browserHistory.push('/');
        } else {
            this.props.spotifyActions.connectSpotify();
        }
    }

    @autobind
    onLogout() {
        sessionStorage.setItem('token', '');
        this.props.spotifyActions.connectSpotify(true);
    }

    @autobind
    getHashParams() {
        const hashParams = {};
        let exp;
        const reg = /([^&;=]+)=?([^&;]*)/g;
        const query = window.location.hash.substring(1);
        while (exp = reg.exec(query)) {
            hashParams[exp[1]] = decodeURIComponent(exp[2]);
        }
        return hashParams;
    }

    render() {
        const styles = require('./App.scss');
        const theme = require('../../theme/Theme.scss');

        const isLogged = this.props.userData && this.props.userData.id && this.props.loadedUser;

        console.log('render ', this.props.loadedUser, this.props.loginError, isLogged);
        console.log('render not logged in', (this.props.loginError || !isLogged));

        if (this.props.loadingUser) {
            console.log('User is loading?');
            return (
                <div className={styles.app}>
                    <Helmet {...config.app.head}/>

                    <div className={styles.header}>
                    </div>

                    <ProgressBar mode="indeterminate" theme={theme}/>
                </div>
            );
        }

        if (this.props.loginError || !isLogged) {
            return (
                <div className={styles.app}>
                    <Helmet {...config.app.head}/>

                    <div className={styles.appIntro}>
                        <div className={styles.flexImg_3}>
                            <div><img src="discogs_logo.png" width="120px"/></div>
                            <div><img src="plus.png" width="30px"/></div>
                            <div><img src="Spotify_Logo_Black.png" width="120px"/></div>
                        </div>
                        <p>You need to be logged with a Spotify Premium account to access this tool</p>
                        <Button raised onClick={this.onLogout} theme={theme}>
                            <SpotifyIcon /> Log in with Spotify
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.app}>
                <Helmet {...config.app.head}/>

                <div className={styles.header}>
                    <span>Logged as {this.props.userData.id}</span>
                    <Button raised label="Not you?" onClick={this.onLogout}/>
                </div>

                <div className={styles.appContent}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
