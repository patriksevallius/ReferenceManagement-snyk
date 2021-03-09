import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paper-item.reducer';
import { IPaperItem } from 'app/shared/model/paper-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaperItem = (props: IPaperItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paperItemList, match, loading } = props;
  return (
    <div>
      <h2 id="paper-item-heading">
        <Translate contentKey="referenceManagementMonolithApp.paperItem.home.title">Paper Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="referenceManagementMonolithApp.paperItem.home.createLabel">Create new Paper Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paperItemList && paperItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.authors">Authors</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.venue">Venue</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.paperitemId">Paperitem Id</Translate>
                </th>
                <th>
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.paperCollection">Paper Collection</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paperItemList.map((paperItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paperItem.id}`} color="link" size="sm">
                      {paperItem.id}
                    </Button>
                  </td>
                  <td>{paperItem.title}</td>
                  <td>{paperItem.authors}</td>
                  <td>{paperItem.venue}</td>
                  <td>
                    {paperItem.paperitemIdId ? <Link to={`paper-item-id/${paperItem.paperitemIdId}`}>{paperItem.paperitemIdId}</Link> : ''}
                  </td>
                  <td>
                    {paperItem.paperCollectionId ? (
                      <Link to={`paper-collection/${paperItem.paperCollectionId}`}>{paperItem.paperCollectionId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paperItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paperItem.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="referenceManagementMonolithApp.paperItem.home.notFound">No Paper Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paperItem }: IRootState) => ({
  paperItemList: paperItem.entities,
  loading: paperItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperItem);
