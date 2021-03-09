package org.contextmapper.generated.referencemanagementcontext.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link org.contextmapper.generated.referencemanagementcontext.domain.PaperItemId} entity.
 */
public class PaperItemIdDTO implements Serializable {
    
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
        if (!(o instanceof PaperItemIdDTO)) {
            return false;
        }

        return id != null && id.equals(((PaperItemIdDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaperItemIdDTO{" +
            "id=" + getId() +
            "}";
    }
}
