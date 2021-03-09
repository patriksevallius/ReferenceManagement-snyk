import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';

type EntityResponseType = HttpResponse<IPaperCollectionId>;
type EntityArrayResponseType = HttpResponse<IPaperCollectionId[]>;

@Injectable({ providedIn: 'root' })
export class PaperCollectionIdService {
  public resourceUrl = SERVER_API_URL + 'services/referencemanagementcontext/api/paper-collection-ids';

  constructor(protected http: HttpClient) {}

  create(paperCollectionId: IPaperCollectionId): Observable<EntityResponseType> {
    return this.http.post<IPaperCollectionId>(this.resourceUrl, paperCollectionId, { observe: 'response' });
  }

  update(paperCollectionId: IPaperCollectionId): Observable<EntityResponseType> {
    return this.http.put<IPaperCollectionId>(this.resourceUrl, paperCollectionId, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaperCollectionId>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaperCollectionId[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
