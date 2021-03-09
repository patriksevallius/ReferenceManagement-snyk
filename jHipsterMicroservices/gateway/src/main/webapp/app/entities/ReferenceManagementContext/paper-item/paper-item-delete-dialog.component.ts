import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';
import { PaperItemService } from './paper-item.service';

@Component({
  templateUrl: './paper-item-delete-dialog.component.html',
})
export class PaperItemDeleteDialogComponent {
  paperItem?: IPaperItem;

  constructor(protected paperItemService: PaperItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paperItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paperItemListModification');
      this.activeModal.close();
    });
  }
}
