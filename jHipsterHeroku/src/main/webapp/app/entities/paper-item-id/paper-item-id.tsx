import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paper-item-id.reducer';
import { IPaperItemId } from 'app/shared/model/paper-item-id.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperItemIdProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaperItemId = (props: IPaperItemIdProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paperItemIdList, match, loading } = props;
  return (
    <div>
      <h2 id="paper-item-id-heading">
        <Translate contentKey="referenceManagementMonolithApp.paperItemId.home.title">Paper Item Ids</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="referenceManagementMonolithApp.paperItemId.home.createLabel">Create new Paper Item Id</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paperItemIdList && paperItemIdList.length > 0 ? (
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
              {paperItemIdList.map((paperItemId, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paperItemId.id}`} color="link" size="sm">
                      {paperItemId.id}
                    </Button>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paperItemId.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperItemId.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperItemId.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="referenceManagementMonolithApp.paperItemId.home.notFound">No Paper Item Ids found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paperItemId }: IRootState) => ({
  paperItemIdList: paperItemId.entities,
  loading: paperItemId.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperItemId);
