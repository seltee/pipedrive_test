import React from 'react';
import PropTypes from 'prop-types';
import {getLetters} from 'src/helpers.js';
import "less/person.scss";

export default class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  remove = e => {
    event.stopPropagation();
    this.props.removePerson && this.props.removePerson();
  }

  render() {
    let {person, openPerson} = this.props;

    return (
      <div
        className="person-component noselect"
        onClick={openPerson}
      >
          <div className="remove block-button-x"
               onClick={this.remove}>
          </div>

          <div className="left-side">
              <div className="name">{person.name}</div>
              <div className="org-name">{person.org_name}</div>
          </div>

          <div className="right-side">
              <div className="avatar">
                {
                  person.picture_id ?
                    <img src={person.picture_id.pictures['128']}/>
                    :
                    <div className="empty">{
                      getLetters(person.name)
                    }</div>
                }
              </div>
          </div>
      </div>
    )
  }
};

Person.propTypes = {
  removePerson: PropTypes.func,
  openPerson: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};
