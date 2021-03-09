package org.contextmapper.generated.referencemanagementcontext.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.contextmapper.generated.referencemanagementcontext.web.rest.TestUtil;

public class PaperItemIdDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaperItemIdDTO.class);
        PaperItemIdDTO paperItemIdDTO1 = new PaperItemIdDTO();
        paperItemIdDTO1.setId(1L);
        PaperItemIdDTO paperItemIdDTO2 = new PaperItemIdDTO();
        assertThat(paperItemIdDTO1).isNotEqualTo(paperItemIdDTO2);
        paperItemIdDTO2.setId(paperItemIdDTO1.getId());
        assertThat(paperItemIdDTO1).isEqualTo(paperItemIdDTO2);
        paperItemIdDTO2.setId(2L);
        assertThat(paperItemIdDTO1).isNotEqualTo(paperItemIdDTO2);
        paperItemIdDTO1.setId(null);
        assertThat(paperItemIdDTO1).isNotEqualTo(paperItemIdDTO2);
    }
}
