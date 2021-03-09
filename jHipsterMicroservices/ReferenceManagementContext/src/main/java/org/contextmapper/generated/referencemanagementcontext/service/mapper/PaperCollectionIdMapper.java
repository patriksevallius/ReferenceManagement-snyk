package org.contextmapper.generated.referencemanagementcontext.service.mapper;


import org.contextmapper.generated.referencemanagementcontext.domain.*;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperCollectionIdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaperCollectionId} and its DTO {@link PaperCollectionIdDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaperCollectionIdMapper extends EntityMapper<PaperCollectionIdDTO, PaperCollectionId> {



    default PaperCollectionId fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaperCollectionId paperCollectionId = new PaperCollectionId();
        paperCollectionId.setId(id);
        return paperCollectionId;
    }
}
