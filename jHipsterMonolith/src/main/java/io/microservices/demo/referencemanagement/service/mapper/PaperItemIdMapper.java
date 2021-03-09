package io.microservices.demo.referencemanagement.service.mapper;


import io.microservices.demo.referencemanagement.domain.*;
import io.microservices.demo.referencemanagement.service.dto.PaperItemIdDTO;

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
