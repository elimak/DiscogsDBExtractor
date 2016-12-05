import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spotifyActions from 'redux/modules/spotify';

function mapStateToProps(state) {
    return {
        playlist: state.spotify.playlist
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spotifyActions: bindActionCreators(spotifyActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistSummary extends Component {
    static propTypes = {
        playlist: PropTypes.object
    };

    render() {
        const cssStyles = require('../Home.scss');

        const hasPlaylist = !!this.props.playlist;

        if (!hasPlaylist) {
            return (<div/>);
        }

        return (
            <div className={cssStyles.results}>
                <div>
                    <h3>Enjoy!</h3>
                    <div className={cssStyles.player}>
                        <iframe src={`https://embed.spotify.com/?uri=${this.props.playlist.uri}`}
                                width="640" height="720" frameBorder="0" allowTransparency="true"></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

