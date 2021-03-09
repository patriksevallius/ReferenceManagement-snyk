package org.contextmapper.generated.referencemanagementcontext.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link org.contextmapper.generated.referencemanagementcontext.domain.PaperCollection} entity.
 */
public class PaperCollectionDTO implements Serializable {
    
    private Long id;


    private Long paperCollectionIdId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPaperCollectionIdId() {
        return paperCollectionIdId;
    }

    public void setPaperCollectionIdId(Long paperCollectionIdId) {
        this.paperCollectionIdId = paperCollectionIdId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaperCollectionDTO)) {
            return false;
        }

        return id != null && id.equals(((PaperCollectionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaperCollectionDTO{" +
            "id=" + getId() +
            ", paperCollectionIdId=" + getPaperCollectionIdId() +
            "}";
    }
}
