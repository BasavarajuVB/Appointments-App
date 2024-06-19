import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleOfStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starStatus = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClicked = () => {
    onToggleOfStar(id)
  }

  return (
    <li className="list-item-container">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button type="button" className="button" onClick={onStarClicked}>
          <img src={starStatus} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
