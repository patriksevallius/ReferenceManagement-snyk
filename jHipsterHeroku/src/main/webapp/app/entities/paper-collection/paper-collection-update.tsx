import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaperCollectionId } from 'app/shared/model/paper-collection-id.model';
import { getEntities as getPaperCollectionIds } from 'app/entities/paper-collection-id/paper-collection-id.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paper-collection.reducer';
import { IPaperCollection } from 'app/shared/model/paper-collection.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaperCollectionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperCollectionUpdate = (props: IPaperCollectionUpdateProps) => {
  const [paperCollectionIdId, setPaperCollectionIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paperCollectionEntity, paperCollectionIds, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/paper-collection');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPaperCollectionIds();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...paperCollectionEntity,
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
          <h2 id="referenceManagementMonolithApp.paperCollection.home.createOrEditLabel">
            <Translate contentKey="referenceManagementMonolithApp.paperCollection.home.createOrEditLabel">
              Create or edit a PaperCollection
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paperCollectionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="paper-collection-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="paper-collection-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="paper-collection-paperCollectionId">
                  <Translate contentKey="referenceManagementMonolithApp.paperCollection.paperCollectionId">Paper Collection Id</Translate>
                </Label>
                <AvInput id="paper-collection-paperCollectionId" type="select" className="form-control" name="paperCollectionIdId">
                  <option value="" key="0" />
                  {paperCollectionIds
                    ? paperCollectionIds.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/paper-collection" replace color="info">
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
  paperCollectionIds: storeState.paperCollectionId.entities,
  paperCollectionEntity: storeState.paperCollection.entity,
  loading: storeState.paperCollection.loading,
  updating: storeState.paperCollection.updating,
  updateSuccess: storeState.paperCollection.updateSuccess,
});

const mapDispatchToProps = {
  getPaperCollectionIds,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollectionUpdate);
