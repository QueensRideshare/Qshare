import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchRide, deleteRide } from '../actions';
import { capFirst } from '../utils/string_manipulation';

class RidesShow extends Component {

  componentDidMount() {
    const id  = this.props.match.params.id;
    this.props.fetchRide(id);
  }

  onDeleteClick() {
    const id  = this.props.match.params.id;
    this.props.deleteRide(id, () =>{
      this.props.history.push('/');
    });
  }

  renderDelete() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid === uid) {
      return (
        <button className="btn btn-danger pull-xs-left" onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
      );
    }
    return (<div></div>);
  }

  render() {
    const { ride } = this.props;
    if (!ride) {
      return (<div><h5>Loading...</h5></div>);
    }
    const readableDate = moment(ride.date).format('dddd, MMMM Do');
    return (
      <div>
          <div className="text-xs-right">
            <Link to="/" className="btn btn-primary">Home</Link>
          </div>
        <h3>{capFirst(ride.name)}</h3>
        <h5><b>User ID:</b> {ride.uid}</h5>
        <h5><b>Price:</b> ${ride.price}</h5>
        <h5><b>Capacity:</b> {ride.capacity} seats</h5>
        <h5><b>Origin:</b> {capFirst(ride.origin)}</h5>
        <h5><b>Destination:</b> {capFirst(ride.destination)}</h5>
        <h5><b>Date:</b> {readableDate}</h5>
        <h5><b>Description:</b></h5><p> {ride.description}</p>
        {this.renderDelete()}
      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
     ride: state.rides[ownProps.match.params.id],
     userInfo: state.fb_state
  };
}

export default connect(mapStateToProps, {fetchRide, deleteRide})(RidesShow);
