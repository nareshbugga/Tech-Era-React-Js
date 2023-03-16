import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const viewsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseItemData: '', view: ''}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({view: viewsList.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(courseDetailsApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const update = {
        courseDetails: data.course_details,
      }
      const {courseDetails} = update
      const updateData = {
        id: courseDetails.id,
        name: courseDetails.name,
        description: courseDetails.description,
        imageUrl: courseDetails.image_url,
      }
      this.setState({courseItemData: updateData, view: viewsList.success})
    } else {
      this.setState({view: viewsList.failure})
    }
  }

  renderCoursesLoader = () => (
    <div data-testid="loader" className="courses-loader">
      <Loader type="TailSpin" color="#4656a1" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getCourseItemDetails()
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

  renderCourseItemDetails = () => {
    const {courseItemData} = this.state
    console.log(courseItemData)
    const {name, description, imageUrl} = courseItemData
    return (
      <>
        <Header />
        <div className="container">
          <div className="item-card-container">
            <img src={imageUrl} alt={name} className="item-card-image" />
            <div className="flex-container">
              <h1 className="item-heading">{name}</h1>
              <p className="item-description">{description}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  resultView = () => {
    const {view} = this.state
    switch (view) {
      case viewsList.success:
        return this.renderCourseItemDetails()
      case viewsList.failure:
        return this.renderCoursesFailure()
      case viewsList.inProgress:
        return this.renderCoursesLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.resultView()}</div>
  }
}

export default CourseItemDetails
