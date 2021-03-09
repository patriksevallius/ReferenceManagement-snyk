import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paper-collection-id.reducer';
import { IPaperCollectionId } from 'app/shared/model/paper-collection-id.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperCollectionIdProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaperCollectionId = (props: IPaperCollectionIdProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paperCollectionIdList, match, loading } = props;
  return (
    <div>
      <h2 id="paper-collection-id-heading">
        <Translate contentKey="referenceManagementMonolithApp.paperCollectionId.home.title">Paper Collection Ids</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="referenceManagementMonolithApp.paperCollectionId.home.createLabel">
            Create new Paper Collection Id
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paperCollectionIdList && paperCollectionIdList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paperCollectionIdList.map((paperCollectionId, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paperCollectionId.id}`} color="link" size="sm">
                      {paperCollectionId.id}
                    </Button>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paperCollectionId.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperCollectionId.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperCollectionId.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="referenceManagementMonolithApp.paperCollectionId.home.notFound">
                No Paper Collection Ids found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paperCollectionId }: IRootState) => ({
  paperCollectionIdList: paperCollectionId.entities,
  loading: paperCollectionId.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollectionId);
