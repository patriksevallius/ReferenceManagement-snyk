package io.microservices.demo.referencemanagement.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link io.microservices.demo.referencemanagement.domain.PaperCollectionId} entity.
 */
public class PaperCollectionIdDTO implements Serializable {
    
    private Long id;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaperCollectionIdDTO)) {
            return false;
        }

        return id != null && id.equals(((PaperCollectionIdDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaperCollectionIdDTO{" +
            "id=" + getId() +
            "}";
    }
}
