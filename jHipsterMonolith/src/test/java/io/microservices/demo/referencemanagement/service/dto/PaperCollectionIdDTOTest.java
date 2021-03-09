package io.microservices.demo.referencemanagement.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.microservices.demo.referencemanagement.web.rest.TestUtil;

public class PaperCollectionIdDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaperCollectionIdDTO.class);
        PaperCollectionIdDTO paperCollectionIdDTO1 = new PaperCollectionIdDTO();
        paperCollectionIdDTO1.setId(1L);
        PaperCollectionIdDTO paperCollectionIdDTO2 = new PaperCollectionIdDTO();
        assertThat(paperCollectionIdDTO1).isNotEqualTo(paperCollectionIdDTO2);
        paperCollectionIdDTO2.setId(paperCollectionIdDTO1.getId());
        assertThat(paperCollectionIdDTO1).isEqualTo(paperCollectionIdDTO2);
        paperCollectionIdDTO2.setId(2L);
        assertThat(paperCollectionIdDTO1).isNotEqualTo(paperCollectionIdDTO2);
        paperCollectionIdDTO1.setId(null);
        assertThat(paperCollectionIdDTO1).isNotEqualTo(paperCollectionIdDTO2);
    }
}
