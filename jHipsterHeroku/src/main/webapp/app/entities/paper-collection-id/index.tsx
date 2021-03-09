import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaperCollectionId from './paper-collection-id';
import PaperCollectionIdDetail from './paper-collection-id-detail';
import PaperCollectionIdUpdate from './paper-collection-id-update';
import PaperCollectionIdDeleteDialog from './paper-collection-id-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaperCollectionIdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaperCollectionIdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaperCollectionIdDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaperCollectionId} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaperCollectionIdDeleteDialog} />
  </>
);

export default Routes;
