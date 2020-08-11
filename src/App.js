import React, {Suspense} from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
// import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faBell,faCaretDown } from '@fortawesome/free-solid-svg-icons'

import Layout from './hoc/Layout/Layout';
import Rootpage from './containers/RootPage/Rootpage';

library.add(fab,faCheckSquare,faBell,faCaretDown)

const App = props => {

  const Customers = React.lazy(() => {
    return import('./containers/Customers/Customers');
  });
  let routes = (
    <Switch>
      <Route path="/spin" render={props => <Spinner />} />
      <Route path="/customers" render={props => <Customers {...props} />} />
      <Route path="/" render={props => <Rootpage/>} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  )

}
 

export default App;
