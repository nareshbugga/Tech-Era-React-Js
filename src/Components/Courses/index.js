import './index.css'
import {Link} from 'react-router-dom'

const Courses = props => {
  const {eachData} = props
  const {id, logoUrl, name} = eachData
  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="course-container">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-card-heading">{name}</p>
      </li>
    </Link>
  )
}

export default Courses
