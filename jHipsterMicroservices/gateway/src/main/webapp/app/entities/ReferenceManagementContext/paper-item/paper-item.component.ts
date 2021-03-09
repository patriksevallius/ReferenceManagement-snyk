import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';
import { PaperItemService } from './paper-item.service';
import { PaperItemDeleteDialogComponent } from './paper-item-delete-dialog.component';

@Component({
  selector: 'jhi-paper-item',
  templateUrl: './paper-item.component.html',
})
export class PaperItemComponent implements OnInit, OnDestroy {
  paperItems?: IPaperItem[];
  eventSubscriber?: Subscription;

  constructor(protected paperItemService: PaperItemService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paperItemService.query().subscribe((res: HttpResponse<IPaperItem[]>) => (this.paperItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaperItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaperItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaperItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('paperItemListModification', () => this.loadAll());
  }

  delete(paperItem: IPaperItem): void {
    const modalRef = this.modalService.open(PaperItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paperItem = paperItem;
  }
}
