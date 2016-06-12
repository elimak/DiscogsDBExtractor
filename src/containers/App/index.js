import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>
      </div>
    );
  }
}
