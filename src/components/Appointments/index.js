import {Component} from 'react'
import './index.css'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], titleInput: '', dateInput: '', isStarred: false}

  onToggleOfStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onStarredClicked = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidV4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onClickDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  filterStarredAppointments = () => {
    const {appointmentList, isActive} = this.state

    if (isActive) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }

    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isActive} = this.state
    const filteredAppointments = this.filterStarredAppointments()
    const activeButtonClassName = isActive ? 'active-btn' : ''

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="mini-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="labelEl">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="title-input"
                  onChange={this.onClickTitleInput}
                  placeholder="Title"
                  value={titleInput}
                />

                <label className="labelEl" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="date-input"
                  value={dateInput}
                  onChange={this.onClickDateInput}
                />

                <button type="submit" className="add-button" data-testid="star">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottom-section">
            <h1 className="bottom-section-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${activeButtonClassName}`}
              onClick={this.onStarredClicked}
            >
              Starred
            </button>
          </div>

          <ul className="list-items-container">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onToggleOfStar={this.onToggleOfStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
