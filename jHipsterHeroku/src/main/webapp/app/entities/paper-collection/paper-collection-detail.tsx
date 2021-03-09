import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paper-collection.reducer';
import { IPaperCollection } from 'app/shared/model/paper-collection.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperCollectionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperCollectionDetail = (props: IPaperCollectionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paperCollectionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="referenceManagementMonolithApp.paperCollection.detail.title">PaperCollection</Translate> [
          <b>{paperCollectionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="referenceManagementMonolithApp.paperCollection.paperCollectionId">Paper Collection Id</Translate>
          </dt>
          <dd>{paperCollectionEntity.paperCollectionIdId ? paperCollectionEntity.paperCollectionIdId : ''}</dd>
        </dl>
        <Button tag={Link} to="/paper-collection" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paper-collection/${paperCollectionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paperCollection }: IRootState) => ({
  paperCollectionEntity: paperCollection.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollectionDetail);
