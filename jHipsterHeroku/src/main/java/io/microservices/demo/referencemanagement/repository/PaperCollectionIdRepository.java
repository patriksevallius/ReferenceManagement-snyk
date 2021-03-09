package io.microservices.demo.referencemanagement.repository;

import io.microservices.demo.referencemanagement.domain.PaperCollectionId;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PaperCollectionId entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaperCollectionIdRepository extends JpaRepository<PaperCollectionId, Long> {
}
