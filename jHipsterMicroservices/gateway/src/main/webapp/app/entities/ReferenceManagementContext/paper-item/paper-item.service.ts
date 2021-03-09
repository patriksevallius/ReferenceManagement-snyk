import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

type EntityResponseType = HttpResponse<IPaperItem>;
type EntityArrayResponseType = HttpResponse<IPaperItem[]>;

@Injectable({ providedIn: 'root' })
export class PaperItemService {
  public resourceUrl = SERVER_API_URL + 'services/referencemanagementcontext/api/paper-items';

  constructor(protected http: HttpClient) {}

  create(paperItem: IPaperItem): Observable<EntityResponseType> {
    return this.http.post<IPaperItem>(this.resourceUrl, paperItem, { observe: 'response' });
  }

  update(paperItem: IPaperItem): Observable<EntityResponseType> {
    return this.http.put<IPaperItem>(this.resourceUrl, paperItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaperItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaperItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
