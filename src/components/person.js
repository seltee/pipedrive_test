import React from 'react';
import PropTypes from 'prop-types';
import { getLetters } from 'src/helpers';

import 'scss/person.scss';

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  remove = (event) => {
    event.stopPropagation();
    if (this.props.removePerson) {
      this.props.removePerson();
    }
  }

  render() {
    const { person, openPerson } = this.props;

    return (
      <div
        className="person-component noselect"
        role="button"
        onClick={openPerson}
        onKeyPress={openPerson}
        tabIndex={0}
      >
        <div
          className="remove block-button-x"
          onClick={this.remove}
          role="button"
          onKeyPress={this.remove}
          tabIndex={0}
        >
          X
        </div>

        <div className="left-side">
          <div className="name">{person.name}</div>
          <div className="org-name">{person.org_name}</div>
        </div>

        <div className="right-side">
          <div className="avatar">
            {
              person.picture_id ?
                <img src={person.picture_id.pictures['128']} alt="" />
                :
                <div className="empty">
                  {
                    getLetters(person.name)
                  }
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Person.propTypes = {
  removePerson: PropTypes.func,
  openPerson: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

Person.defaultProps = {
  removePerson: null
};
