package io.microservices.demo.referencemanagement.repository;

import io.microservices.demo.referencemanagement.domain.PaperItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PaperItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaperItemRepository extends JpaRepository<PaperItem, Long> {
}
