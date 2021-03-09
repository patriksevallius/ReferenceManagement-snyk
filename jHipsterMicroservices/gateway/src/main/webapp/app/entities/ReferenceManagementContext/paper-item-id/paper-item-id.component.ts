import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';
import { PaperItemIdService } from './paper-item-id.service';
import { PaperItemIdDeleteDialogComponent } from './paper-item-id-delete-dialog.component';

@Component({
  selector: 'jhi-paper-item-id',
  templateUrl: './paper-item-id.component.html',
})
export class PaperItemIdComponent implements OnInit, OnDestroy {
  paperItemIds?: IPaperItemId[];
  eventSubscriber?: Subscription;

  constructor(
    protected paperItemIdService: PaperItemIdService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paperItemIdService.query().subscribe((res: HttpResponse<IPaperItemId[]>) => (this.paperItemIds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaperItemIds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaperItemId): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaperItemIds(): void {
    this.eventSubscriber = this.eventManager.subscribe('paperItemIdListModification', () => this.loadAll());
  }

  delete(paperItemId: IPaperItemId): void {
    const modalRef = this.modalService.open(PaperItemIdDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paperItemId = paperItemId;
  }
}
