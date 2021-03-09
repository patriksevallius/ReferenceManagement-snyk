package io.microservices.demo.referencemanagement.repository;

import io.microservices.demo.referencemanagement.domain.PaperCollection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PaperCollection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaperCollectionRepository extends JpaRepository<PaperCollection, Long> {
}
