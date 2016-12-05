import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spotifyActions from 'redux/modules/spotify';
import { Switch } from 'react-toolbox/lib/switch';

function mapStateToProps(state) {
    return {
        discogsData: state.discogs.discogsData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spotifyActions: bindActionCreators(spotifyActions, dispatch),
    };
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AlbumsFound extends Component {
    static propTypes = {
        discogsData: PropTypes.object,
        selectionUpdate: PropTypes.function
    };

    state = {
        removed: []
    }

    componentWillMount() {
        this.selectionUpdate();
    }

    getRows() {
        const rows = [];
        for (let index = 0; index < this.props.discogsData.length; index += 3) {
            rows.push([this.props.discogsData[index], this.props.discogsData[(index + 1)], this.props.discogsData[(index + 2)]]);
        }

        return rows;
    }

    getRow(row, index) {
        const cssStyles = require('../Home.scss');
        return (
            <div className={cssStyles.row} key={index}>
                <div className={cssStyles.flexBox_3}>
                    <div>
                        { this.getItem(row[0]) }
                    </div>
                    <div>
                        { this.getItem(row[1]) }
                    </div>
                    <div>
                        { this.getItem(row[2]) }
                    </div>
                </div>
            </div>
        );
    }

    getItem(album) {
        if (!album) {
            return (<div></div>);
        }

        const cssStyles = require('../Home.scss');
        return (<div>
            <div className={cssStyles.player}>
                <iframe src={`https://embed.spotify.com/?uri=spotify:album:${album.id}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
            </div>
            <Switch
                checked={this.isChecked(album.id)}
                label="Add to playlist"
                onChange={this.handleChange.bind(this, album.id)}
            />
            <div className={cssStyles['card-body']}>
                <div>{album.artist.name} - {album.name}</div>
                <ul>
                    <li className={cssStyles.pink}><span>Styles: </span>{album.styles.join(', ')}</li>
                    <li className={cssStyles.blue}><span>Labels: </span>{album.labels.join(', ')}</li>
                    <li><span>Year: </span>{album.year} <span>Country: </span>{album.country}</li>
                    <li><span>External urls: </span><a href={album.spotify} target="_blank">Spotify</a><span> - </span><a href={album.discogs} target="_blank">Discogs</a></li>
                </ul>
            </div>
        </div>);
    }

    handleChange(albumID, value) {
        const removed = this.state.removed;
        if (!value) {
            if (this.isChecked(albumID)) {
                removed.push(albumID);
            }
        } else {
            const index = removed.indexOf(albumID);
            removed.splice(index, 1);
        }
        this.setState({
            removed
        });

        this.selectionUpdate();
    }

    selectionUpdate() {
        const removed = this.state.removed;
        const filtered = this.props.discogsData.filter((data) => !removed.includes(data.id));
        this.props.selectionUpdate(filtered);
    }

    isChecked(albumID) {
        return !this.state.removed.includes(albumID);
    }

    render() {
        const cssStyles = require('../Home.scss');

        return (
            <div className={cssStyles.results}>
                { this.getRows().map((row, index) => this.getRow(row, index)) }
            </div>
        );
    }
}
