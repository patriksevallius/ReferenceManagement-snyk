import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaperItemId from './paper-item-id';
import PaperItemIdDetail from './paper-item-id-detail';
import PaperItemIdUpdate from './paper-item-id-update';
import PaperItemIdDeleteDialog from './paper-item-id-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaperItemIdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaperItemIdUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaperItemIdDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaperItemId} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaperItemIdDeleteDialog} />
  </>
);

export default Routes;
