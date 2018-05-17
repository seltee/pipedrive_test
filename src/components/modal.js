import React from 'react';
import PropTypes from 'prop-types';

import 'scss/modal.scss';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  close = () => {
    if (this.props.toggle) {
      this.props.toggle();
    }
  }

  render() {
    const {
      className, open, children, confirm, header
    } = this.props;

    const mainClassName = `modal-component ${className} ${open ? ' opened' : ''}`;

    return (
      <div className={mainClassName}>
        <div className="backgound" />
        <div className="modal-content">
          <div
            className="close"
            onClick={this.close}
            onKeyPress={this.close}
            role="button"
            tabIndex={0}
          >
            X
          </div>
          <div className="header">{header}</div>
          <div className="content">
            {
              children
            }
          </div>
          <div className="footer">
            {
              confirm ?
                <div
                  className="block-button accept"
                  onClick={confirm}
                  onKeyPress={confirm}
                  role="button"
                  tabIndex={0}
                >
                Confirm
                </div> : null
            }
            <div
              className="block-button back"
              onClick={this.close}
              onKeyPress={this.close}
              role="button"
              tabIndex={0}
            >
              Back
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func,
  header: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  confirm: PropTypes.func,
  children: PropTypes.object
};

Modal.defaultProps = {
  toggle: null,
  header: 'Modal',
  className: '',
  confirm: null,
  children: null
};
