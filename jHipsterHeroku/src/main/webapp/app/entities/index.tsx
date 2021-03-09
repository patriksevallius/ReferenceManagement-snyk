import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaperItem from './paper-item';
import PaperCollection from './paper-collection';
import PaperItemId from './paper-item-id';
import PaperCollectionId from './paper-collection-id';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}paper-item`} component={PaperItem} />
      <ErrorBoundaryRoute path={`${match.url}paper-collection`} component={PaperCollection} />
      <ErrorBoundaryRoute path={`${match.url}paper-item-id`} component={PaperItemId} />
      <ErrorBoundaryRoute path={`${match.url}paper-collection-id`} component={PaperCollectionId} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
