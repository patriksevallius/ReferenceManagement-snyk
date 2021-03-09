import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paper-item.reducer';
import { IPaperItem } from 'app/shared/model/paper-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaperItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperItemDetail = (props: IPaperItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paperItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="referenceManagementMonolithApp.paperItem.detail.title">PaperItem</Translate> [<b>{paperItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="referenceManagementMonolithApp.paperItem.title">Title</Translate>
            </span>
          </dt>
          <dd>{paperItemEntity.title}</dd>
          <dt>
            <span id="authors">
              <Translate contentKey="referenceManagementMonolithApp.paperItem.authors">Authors</Translate>
            </span>
          </dt>
          <dd>{paperItemEntity.authors}</dd>
          <dt>
            <span id="venue">
              <Translate contentKey="referenceManagementMonolithApp.paperItem.venue">Venue</Translate>
            </span>
          </dt>
          <dd>{paperItemEntity.venue}</dd>
          <dt>
            <Translate contentKey="referenceManagementMonolithApp.paperItem.paperitemId">Paperitem Id</Translate>
          </dt>
          <dd>{paperItemEntity.paperitemIdId ? paperItemEntity.paperitemIdId : ''}</dd>
          <dt>
            <Translate contentKey="referenceManagementMonolithApp.paperItem.paperCollection">Paper Collection</Translate>
          </dt>
          <dd>{paperItemEntity.paperCollectionId ? paperItemEntity.paperCollectionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/paper-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paper-item/${paperItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paperItem }: IRootState) => ({
  paperItemEntity: paperItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperItemDetail);
