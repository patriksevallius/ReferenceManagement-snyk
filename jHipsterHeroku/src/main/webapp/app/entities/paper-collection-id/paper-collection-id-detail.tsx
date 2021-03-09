import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paper-collection-id.reducer';
import { IPaperCollectionId } from 'app/shared/model/paper-collection-id.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperCollectionIdDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperCollectionIdDetail = (props: IPaperCollectionIdDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paperCollectionIdEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="referenceManagementMonolithApp.paperCollectionId.detail.title">PaperCollectionId</Translate> [
          <b>{paperCollectionIdEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details"></dl>
        <Button tag={Link} to="/paper-collection-id" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paper-collection-id/${paperCollectionIdEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paperCollectionId }: IRootState) => ({
  paperCollectionIdEntity: paperCollectionId.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollectionIdDetail);
