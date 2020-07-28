import React, {useEffect, Suspense} from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';

const App = props => {

  return (
    <div>
      <Layout>

      </Layout>
    </div>
  )

}
 

export default App;
