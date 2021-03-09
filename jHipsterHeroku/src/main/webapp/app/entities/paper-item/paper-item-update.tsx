import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaperItemId } from 'app/shared/model/paper-item-id.model';
import { getEntities as getPaperItemIds } from 'app/entities/paper-item-id/paper-item-id.reducer';
import { IPaperCollection } from 'app/shared/model/paper-collection.model';
import { getEntities as getPaperCollections } from 'app/entities/paper-collection/paper-collection.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paper-item.reducer';
import { IPaperItem } from 'app/shared/model/paper-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaperItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperItemUpdate = (props: IPaperItemUpdateProps) => {
  const [paperitemIdId, setPaperitemIdId] = useState('0');
  const [paperCollectionId, setPaperCollectionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paperItemEntity, paperItemIds, paperCollections, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/paper-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPaperItemIds();
    props.getPaperCollections();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...paperItemEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="referenceManagementMonolithApp.paperItem.home.createOrEditLabel">
            <Translate contentKey="referenceManagementMonolithApp.paperItem.home.createOrEditLabel">Create or edit a PaperItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paperItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="paper-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="paper-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="paper-item-title">
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.title">Title</Translate>
                </Label>
                <AvField id="paper-item-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="authorsLabel" for="paper-item-authors">
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.authors">Authors</Translate>
                </Label>
                <AvField id="paper-item-authors" type="text" name="authors" />
              </AvGroup>
              <AvGroup>
                <Label id="venueLabel" for="paper-item-venue">
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.venue">Venue</Translate>
                </Label>
                <AvField id="paper-item-venue" type="text" name="venue" />
              </AvGroup>
              <AvGroup>
                <Label for="paper-item-paperitemId">
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.paperitemId">Paperitem Id</Translate>
                </Label>
                <AvInput id="paper-item-paperitemId" type="select" className="form-control" name="paperitemIdId">
                  <option value="" key="0" />
                  {paperItemIds
                    ? paperItemIds.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="paper-item-paperCollection">
                  <Translate contentKey="referenceManagementMonolithApp.paperItem.paperCollection">Paper Collection</Translate>
                </Label>
                <AvInput id="paper-item-paperCollection" type="select" className="form-control" name="paperCollectionId">
                  <option value="" key="0" />
                  {paperCollections
                    ? paperCollections.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/paper-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  paperItemIds: storeState.paperItemId.entities,
  paperCollections: storeState.paperCollection.entities,
  paperItemEntity: storeState.paperItem.entity,
  loading: storeState.paperItem.loading,
  updating: storeState.paperItem.updating,
  updateSuccess: storeState.paperItem.updateSuccess,
});

const mapDispatchToProps = {
  getPaperItemIds,
  getPaperCollections,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperItemUpdate);
