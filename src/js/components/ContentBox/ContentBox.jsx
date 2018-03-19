import * as React from 'react'
import styles from './ContentBox.scss'

import Spinner from './Spinner'

export default class ContentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };

    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderClick() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render() {
    return (
      <div className={styles.ContentBox}>
        <div className={styles.ContentBoxHeader} onClick={this.onHeaderClick}>
          {this.props.title}
        </div>

        { !this.state.hidden ?
          <div className={styles.ContentBoxContent}>
            { this.props.showSpinner ? <Spinner /> : null }
            <div className={styles.ContentBoxContentInner}>
              {this.props.children}
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}
