import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import CourseItemDetails from './Components/CourseItemDetails'
import NotFound from './Components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
