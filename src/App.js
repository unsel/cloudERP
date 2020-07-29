import React, {useEffect, Suspense} from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';

import Layout from './hoc/Layout/Layout';

const App = props => {

  const Customers = React.lazy(() => {
    return import('./containers/Customers/Customers');
  });
  let routes = (
    <Switch>
      <Route path="/spin" render={props => <Spinner />} />
      <Route path="/customers" render={props => <Customers {...props} />} />
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
