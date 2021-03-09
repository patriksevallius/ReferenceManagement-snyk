package io.microservices.demo.referencemanagement.repository;

import io.microservices.demo.referencemanagement.domain.PaperItemId;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PaperItemId entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaperItemIdRepository extends JpaRepository<PaperItemId, Long> {
}
