import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paper-collection.reducer';
import { IPaperCollection } from 'app/shared/model/paper-collection.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperCollectionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaperCollection = (props: IPaperCollectionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paperCollectionList, match, loading } = props;
  return (
    <div>
      <h2 id="paper-collection-heading">
        <Translate contentKey="referenceManagementMonolithApp.paperCollection.home.title">Paper Collections</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="referenceManagementMonolithApp.paperCollection.home.createLabel">Create new Paper Collection</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paperCollectionList && paperCollectionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperCollection.paperCollectionId">Paper Collection Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paperCollectionList.map((paperCollection, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paperCollection.id}`} color="link" size="sm">
                      {paperCollection.id}
                    </Button>
                  </td>
                  <td>
                    {paperCollection.paperCollectionIdId ? (
                      <Link to={`paper-collection-id/${paperCollection.paperCollectionIdId}`}>{paperCollection.paperCollectionIdId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paperCollection.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperCollection.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperCollection.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="referenceManagementMonolithApp.paperCollection.home.notFound">No Paper Collections found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paperCollection }: IRootState) => ({
  paperCollectionList: paperCollection.entities,
  loading: paperCollection.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollection);
