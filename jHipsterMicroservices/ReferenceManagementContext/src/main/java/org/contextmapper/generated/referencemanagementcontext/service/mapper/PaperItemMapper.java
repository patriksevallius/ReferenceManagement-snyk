package org.contextmapper.generated.referencemanagementcontext.service.mapper;


import org.contextmapper.generated.referencemanagementcontext.domain.*;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaperItem} and its DTO {@link PaperItemDTO}.
 */
@Mapper(componentModel = "spring", uses = {PaperItemIdMapper.class, PaperCollectionMapper.class})
public interface PaperItemMapper extends EntityMapper<PaperItemDTO, PaperItem> {

    @Mapping(source = "paperitemId.id", target = "paperitemIdId")
    @Mapping(source = "paperCollection.id", target = "paperCollectionId")
    PaperItemDTO toDto(PaperItem paperItem);

    @Mapping(source = "paperitemIdId", target = "paperitemId")
    @Mapping(source = "paperCollectionId", target = "paperCollection")
    PaperItem toEntity(PaperItemDTO paperItemDTO);

    default PaperItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaperItem paperItem = new PaperItem();
        paperItem.setId(id);
        return paperItem;
    }
}
