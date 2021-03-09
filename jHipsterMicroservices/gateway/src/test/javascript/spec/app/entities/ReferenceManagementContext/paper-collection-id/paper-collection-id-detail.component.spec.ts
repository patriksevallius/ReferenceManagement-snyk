import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionIdDetailComponent } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id-detail.component';
import { PaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';

describe('Component Tests', () => {
  describe('PaperCollectionId Management Detail Component', () => {
    let comp: PaperCollectionIdDetailComponent;
    let fixture: ComponentFixture<PaperCollectionIdDetailComponent>;
    const route = ({ data: of({ paperCollectionId: new PaperCollectionId(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionIdDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaperCollectionIdDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaperCollectionIdDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paperCollectionId on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paperCollectionId).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
