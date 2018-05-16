import React from 'react';
import {getPersonsList, removePerson, addPerson, setOrder} from "src/api/datapoint.js";
import Person from "src/components/person.js";
import Modal from "src/components/modal.js";
import DragList from "react-drag-list";
import {getLetters} from 'src/helpers.js';

import "less/app.scss";

const order = 'fca445b80195f52fdb36b2a043465eebb8b62ad0';
const group = '3b599d577a75c510b182a0fb2bcefc7c2a9fc3a7';
const assistant = '3110db9a2f3f7b5cc9bb6ae2661235a8ca3ea1c6';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionError: null,
      currentPage: 0,
      persons: [],
      moreExist: false,
      personsFields: [],
      readMoreModal: false,
      readMorePerson: null,
      search: "",
      lastSearch: "",
      addPersonModal: false,
      addPersonName: "",
      addPersonPhone: ""
    }
  };

  componentDidMount() {
    this.updatePersonsList();
  };

  updatePersonsList = () => {
    getPersonsList(this.state.search, order, 0).then(
      (responce) => {
        const {data, additional_data} = responce.data;
        this.setState({
          persons: data,
          currentPage: 1,
          moreExist: additional_data.pagination.more_items_in_collection
        });
      }
    );
  };

  loadMore = () => {
    getPersonsList(this.state.search, order, this.state.currentPage).then(
      (response) => {
        const {data, additional_data} = response.data;
        const {persons, currentPage} = this.state;
        if (data) {
          this.setState({
            persons: persons.concat(data),
            currentPage: currentPage + 1,
            moreExist: additional_data.pagination.more_items_in_collection
          });
        }
      }
    );
  };

  readMore = (person) => {
    this.setState({
      readMorePerson: person,
      readMoreModal: true
    });
  };

  removePerson = (person) => {
    removePerson(person.id).then(this.updatePersonsList);
  };

  openAddPersonModal = () =>{
    this.setState({
      addPersonModal: true,
      addPersonName: "",
      addPersonPhone: ""
    });
  };

  addPerson = () => {
    addPerson(this.state.addPersonName, this.state.addPersonPhone).then(
      () => {
      this.updatePersonsList();
      this.setState({
        addPersonModal: false
      });
    });
  };

  updateOrder = (event, updated) => {
    this.state.persons.forEach((o, i) => {
      if (i !== o[order]) {
        setOrder(o.id, order, i);
      }
    });
  };

  getDragListRow = (record, index) => {
    return <Person person={record}
                   openPerson={() => this.readMore(record)}
                   removePerson={() => this.removePerson(record)}/>;
  };

  handleSearch = e => {
    let newVal = e.target.value;

    setTimeout(() => {
      if (this.state.search == newVal) {
        this.updatePersonsList();
        this.setState({
          lastSearch: search
        })
      }
    }, 300);

    this.setState({
      search: newVal
    });
  };

  handleInput = e => {
    let name = e.target.getAttribute('name');
    let stateChange = {};
    stateChange[name] = e.target.value;
    this.setState(stateChange);
  };

  toggleModal = () => {
    this.setState({
      readMoreModal: false,
      addPersonModal: false
    });
  };

  render() {
    let {persons, readMorePerson, readMoreModal, addPersonModal, moreExist, search,
      addPersonName, addPersonPhone} = this.state;

    console.log(persons);

    return (
      <div className="app-component">
        <div className="header">
          <div className="block980">
            <img src="/logo.svg" />
          </div>
        </div>
        <div className="list-header">
          <div className="block980 bold">
            {"People's list"}
          </div>
        </div>
        <hr />
        <div className="list-search">
          <div className="block980 bold">
            <input
              value={search}
              onChange={this.handleSearch}
              placeholder="Search filter"
            />
            <div className="block-button add-person"
                 onClick={this.openAddPersonModal}>Add person
            </div>
          </div>
        </div>
        <div className="list">
          <div className="block980">
            {
              persons ?
                <DragList
                  dataSource={persons}
                  rowKey="id"
                  row={this.getDragListRow}
                  handles={false}
                  onUpdate={this.updateOrder}
                /> : null
            }
          </div>
        </div>

        {
          moreExist ?
            <div className="pagination">
              <div className="block980">
                <div className="block-button load-more"
                     onClick={this.loadMore}>Load more
                </div>
              </div>
            </div> : null
        }

        <div className="footer" />

        <Modal open={ readMoreModal }
               header={readMorePerson ? readMorePerson.name : ''}
               className="person-modal"
               toggle={this.toggleModal}>
          {
            readMorePerson ? <div>
              <div className="avatar">
                {
                  readMorePerson.picture_id ?
                    <img src={readMorePerson.picture_id.pictures['128']}/>
                    :
                    <div className="empty">{
                      getLetters(readMorePerson.name)
                    }</div>
                }
              </div>

              <div className="title">{readMorePerson.name}</div>
              <div className="phone">{readMorePerson.phone[0].value}</div>
              <hr />
              <div className="value-list">
                <div>
                  <span>Email</span>
                  <span>{readMorePerson.email[0].value}</span>
                </div>
                <div>
                  <span>Organization</span>
                  <span>{readMorePerson.org_name}</span>
                </div>
                <div>
                  <span>Assistant</span>
                  <span>
                    {readMorePerson[assistant] && readMorePerson[assistant].name}
                    </span>
                </div>
                <div>
                  <span>Groups</span>
                  <span>{readMorePerson[group] && readMorePerson[group].name}</span>
                </div>
                <div>
                  <span>Location</span>
                  <span>{readMorePerson.org_id && readMorePerson.org_id.address}</span>
                </div>
              </div>
            </div> : null
          }
        </Modal>

        <Modal open={ addPersonModal } header="Adding person"
               className="person-modal"
               toggle={this.toggleModal}
               confirm={this.addPerson}>
          <div className="input-list">
            <div>
              <label>Name</label>
              <input value={addPersonName}
                     onChange={this.handleInput}
                     name="addPersonName"
              />
            </div>
            <div>
              <label>Phone</label>
              <input value={addPersonPhone}
                     onChange={this.handleInput}
                     name="addPersonPhone"
              />
            </div>
          </div>
        </Modal>

      </div>
    )
  }
};