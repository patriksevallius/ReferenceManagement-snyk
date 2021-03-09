import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';
import { PaperCollectionIdService } from './paper-collection-id.service';
import { PaperCollectionIdDeleteDialogComponent } from './paper-collection-id-delete-dialog.component';

@Component({
  selector: 'jhi-paper-collection-id',
  templateUrl: './paper-collection-id.component.html',
})
export class PaperCollectionIdComponent implements OnInit, OnDestroy {
  paperCollectionIds?: IPaperCollectionId[];
  eventSubscriber?: Subscription;

  constructor(
    protected paperCollectionIdService: PaperCollectionIdService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paperCollectionIdService
      .query()
      .subscribe((res: HttpResponse<IPaperCollectionId[]>) => (this.paperCollectionIds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaperCollectionIds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaperCollectionId): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaperCollectionIds(): void {
    this.eventSubscriber = this.eventManager.subscribe('paperCollectionIdListModification', () => this.loadAll());
  }

  delete(paperCollectionId: IPaperCollectionId): void {
    const modalRef = this.modalService.open(PaperCollectionIdDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paperCollectionId = paperCollectionId;
  }
}
