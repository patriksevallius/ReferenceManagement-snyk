import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paper-collection-id.reducer';
import { IPaperCollectionId } from 'app/shared/model/paper-collection-id.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaperCollectionIdUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaperCollectionIdUpdate = (props: IPaperCollectionIdUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paperCollectionIdEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/paper-collection-id');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...paperCollectionIdEntity,
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
          <h2 id="referenceManagementMonolithApp.paperCollectionId.home.createOrEditLabel">
            <Translate contentKey="referenceManagementMonolithApp.paperCollectionId.home.createOrEditLabel">
              Create or edit a PaperCollectionId
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paperCollectionIdEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="paper-collection-id-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="paper-collection-id-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <Button tag={Link} id="cancel-save" to="/paper-collection-id" replace color="info">
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
  paperCollectionIdEntity: storeState.paperCollectionId.entity,
  loading: storeState.paperCollectionId.loading,
  updating: storeState.paperCollectionId.updating,
  updateSuccess: storeState.paperCollectionId.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaperCollectionIdUpdate);
