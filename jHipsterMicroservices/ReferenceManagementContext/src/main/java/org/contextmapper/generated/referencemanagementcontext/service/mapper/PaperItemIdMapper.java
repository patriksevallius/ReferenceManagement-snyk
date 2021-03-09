package org.contextmapper.generated.referencemanagementcontext.service.mapper;


import org.contextmapper.generated.referencemanagementcontext.domain.*;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperItemIdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaperItemId} and its DTO {@link PaperItemIdDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaperItemIdMapper extends EntityMapper<PaperItemIdDTO, PaperItemId> {



    default PaperItemId fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaperItemId paperItemId = new PaperItemId();
        paperItemId.setId(id);
        return paperItemId;
    }
}
