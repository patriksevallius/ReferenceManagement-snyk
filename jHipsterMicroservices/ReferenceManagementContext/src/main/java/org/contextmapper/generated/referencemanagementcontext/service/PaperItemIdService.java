package org.contextmapper.generated.referencemanagementcontext.service;

import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperItemIdDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link org.contextmapper.generated.referencemanagementcontext.domain.PaperItemId}.
 */
public interface PaperItemIdService {

    /**
     * Save a paperItemId.
     *
     * @param paperItemIdDTO the entity to save.
     * @return the persisted entity.
     */
    PaperItemIdDTO save(PaperItemIdDTO paperItemIdDTO);

    /**
     * Get all the paperItemIds.
     *
     * @return the list of entities.
     */
    List<PaperItemIdDTO> findAll();


    /**
     * Get the "id" paperItemId.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PaperItemIdDTO> findOne(Long id);

    /**
     * Delete the "id" paperItemId.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
