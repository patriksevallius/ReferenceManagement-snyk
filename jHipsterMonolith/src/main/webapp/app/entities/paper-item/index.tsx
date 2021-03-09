import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PaperItem from './paper-item';
import PaperItemDetail from './paper-item-detail';
import PaperItemUpdate from './paper-item-update';
import PaperItemDeleteDialog from './paper-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaperItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaperItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaperItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={PaperItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaperItemDeleteDialog} />
  </>
);

export default Routes;
