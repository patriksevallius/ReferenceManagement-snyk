import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';
import { PaperItemIdService } from './paper-item-id.service';

@Component({
  templateUrl: './paper-item-id-delete-dialog.component.html',
})
export class PaperItemIdDeleteDialogComponent {
  paperItemId?: IPaperItemId;

  constructor(
    protected paperItemIdService: PaperItemIdService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paperItemIdService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paperItemIdListModification');
      this.activeModal.close();
    });
  }
}
