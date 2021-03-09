import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemIdComponent } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id.component';
import { PaperItemIdService } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id.service';
import { PaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';

describe('Component Tests', () => {
  describe('PaperItemId Management Component', () => {
    let comp: PaperItemIdComponent;
    let fixture: ComponentFixture<PaperItemIdComponent>;
    let service: PaperItemIdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemIdComponent],
      })
        .overrideTemplate(PaperItemIdComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperItemIdComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperItemIdService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaperItemId(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paperItemIds && comp.paperItemIds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
