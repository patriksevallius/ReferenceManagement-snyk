import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaperCollection from './paper-collection';
import PaperCollectionDetail from './paper-collection-detail';
import PaperCollectionUpdate from './paper-collection-update';
import PaperCollectionDeleteDialog from './paper-collection-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaperCollectionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaperCollectionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaperCollectionDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaperCollection} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaperCollectionDeleteDialog} />
  </>
);

export default Routes;
