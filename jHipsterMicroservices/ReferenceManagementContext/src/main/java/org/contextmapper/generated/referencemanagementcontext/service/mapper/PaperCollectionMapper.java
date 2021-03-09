package org.contextmapper.generated.referencemanagementcontext.service.mapper;


import org.contextmapper.generated.referencemanagementcontext.domain.*;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperCollectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaperCollection} and its DTO {@link PaperCollectionDTO}.
 */
@Mapper(componentModel = "spring", uses = {PaperCollectionIdMapper.class})
public interface PaperCollectionMapper extends EntityMapper<PaperCollectionDTO, PaperCollection> {

    @Mapping(source = "paperCollectionId.id", target = "paperCollectionIdId")
    PaperCollectionDTO toDto(PaperCollection paperCollection);

    @Mapping(source = "paperCollectionIdId", target = "paperCollectionId")
    @Mapping(target = "paperitemLists", ignore = true)
    @Mapping(target = "removePaperitemList", ignore = true)
    PaperCollection toEntity(PaperCollectionDTO paperCollectionDTO);

    default PaperCollection fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaperCollection paperCollection = new PaperCollection();
        paperCollection.setId(id);
        return paperCollection;
    }
}
