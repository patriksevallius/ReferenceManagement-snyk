package org.contextmapper.generated.referencemanagementcontext.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.contextmapper.generated.referencemanagementcontext.web.rest.TestUtil;

public class PaperItemIdTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaperItemId.class);
        PaperItemId paperItemId1 = new PaperItemId();
        paperItemId1.setId(1L);
        PaperItemId paperItemId2 = new PaperItemId();
        paperItemId2.setId(paperItemId1.getId());
        assertThat(paperItemId1).isEqualTo(paperItemId2);
        paperItemId2.setId(2L);
        assertThat(paperItemId1).isNotEqualTo(paperItemId2);
        paperItemId1.setId(null);
        assertThat(paperItemId1).isNotEqualTo(paperItemId2);
    }
}
