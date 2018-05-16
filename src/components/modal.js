import React from 'react';
import PropTypes from 'prop-types';

import "less/modal.scss";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  close = () => {
    this.props.toggle ? this.props.toggle() : null;
  }

  render() {
    let {className, open, children, confirm, header} = this.props;

    className = `modal-component ${className} ${open ? ' opened' : ''}`;
    header = header ? header : "Modal";

    return (
      <div className={className}>
          <div className="backgound"/>
          <div className="modal-content">
              <div className="close" onClick={this.close}>X</div>
              <div className="header">{header}</div>
              <div className="content">
                {
                  children
                }
              </div>
              <div className="footer">
                {
                  confirm ?
                    <div className="block-button accept" onClick={confirm}>
                        Confirm</div> : null
                }
                  <div className="block-button back"
                       onClick={this.close}>Back</div>
              </div>
          </div>
      </div>
    )
  }
};

Modal.propTypes = {
  toggle: PropTypes.func,
  header: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool,
  confirm: PropTypes.func
};


