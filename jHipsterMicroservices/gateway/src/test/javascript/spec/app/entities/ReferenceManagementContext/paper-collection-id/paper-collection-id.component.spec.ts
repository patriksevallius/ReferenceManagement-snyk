import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionIdComponent } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id.component';
import { PaperCollectionIdService } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id.service';
import { PaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';

describe('Component Tests', () => {
  describe('PaperCollectionId Management Component', () => {
    let comp: PaperCollectionIdComponent;
    let fixture: ComponentFixture<PaperCollectionIdComponent>;
    let service: PaperCollectionIdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionIdComponent],
      })
        .overrideTemplate(PaperCollectionIdComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperCollectionIdComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperCollectionIdService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaperCollectionId(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paperCollectionIds && comp.paperCollectionIds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
