import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemComponent } from 'app/entities/ReferenceManagementContext/paper-item/paper-item.component';
import { PaperItemService } from 'app/entities/ReferenceManagementContext/paper-item/paper-item.service';
import { PaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

describe('Component Tests', () => {
  describe('PaperItem Management Component', () => {
    let comp: PaperItemComponent;
    let fixture: ComponentFixture<PaperItemComponent>;
    let service: PaperItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemComponent],
      })
        .overrideTemplate(PaperItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaperItem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paperItems && comp.paperItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
