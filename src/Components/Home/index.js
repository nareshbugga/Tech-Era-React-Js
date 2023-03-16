import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Courses from '../Courses'

const viewsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesData: [], view: ''}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({view: viewsList.inProgress})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(coursesApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const {courses} = data
      const updateData = courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      console.log(updateData)
      this.setState({coursesData: updateData, view: viewsList.success})
    } else {
      this.setState({view: viewsList.failure})
    }
  }

  renderCoursesData = () => {
    const {coursesData} = this.state
    return (
      <>
        <div>
          <h1 className="course-heading">Courses</h1>
          <ul className="courses-list-container">
            {coursesData.map(eachData => (
              <Courses eachData={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderCoursesLoader = () => (
    <div data-testid="loader" className="courses-loader">
      <Loader type="TailSpin" color="#4656a1" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getCoursesData()
  }

  renderCoursesFailure = () => (
    <div className="failure-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-button" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    </div>
  )

  resultView = () => {
    const {view} = this.state
    switch (view) {
      case viewsList.success:
        return this.renderCoursesData()
      case viewsList.failure:
        return this.renderCoursesFailure()
      case viewsList.inProgress:
        return this.renderCoursesLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.resultView()}</div>
      </>
    )
  }
}

export default Home
