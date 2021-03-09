import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/paper-item">
      <Translate contentKey="global.menu.entities.paperItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paper-collection">
      <Translate contentKey="global.menu.entities.paperCollection" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paper-item-id">
      <Translate contentKey="global.menu.entities.paperItemId" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paper-collection-id">
      <Translate contentKey="global.menu.entities.paperCollectionId" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
