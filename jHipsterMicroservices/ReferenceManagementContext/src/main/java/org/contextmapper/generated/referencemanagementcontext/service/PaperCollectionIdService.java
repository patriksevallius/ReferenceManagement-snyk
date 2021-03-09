package org.contextmapper.generated.referencemanagementcontext.service;

import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperCollectionIdDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link org.contextmapper.generated.referencemanagementcontext.domain.PaperCollectionId}.
 */
public interface PaperCollectionIdService {

    /**
     * Save a paperCollectionId.
     *
     * @param paperCollectionIdDTO the entity to save.
     * @return the persisted entity.
     */
    PaperCollectionIdDTO save(PaperCollectionIdDTO paperCollectionIdDTO);

    /**
     * Get all the paperCollectionIds.
     *
     * @return the list of entities.
     */
    List<PaperCollectionIdDTO> findAll();


    /**
     * Get the "id" paperCollectionId.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PaperCollectionIdDTO> findOne(Long id);

    /**
     * Delete the "id" paperCollectionId.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
