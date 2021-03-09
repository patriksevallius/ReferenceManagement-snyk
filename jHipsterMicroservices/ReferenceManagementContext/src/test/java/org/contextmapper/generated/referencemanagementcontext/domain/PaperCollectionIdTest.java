package org.contextmapper.generated.referencemanagementcontext.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.contextmapper.generated.referencemanagementcontext.web.rest.TestUtil;

public class PaperCollectionIdTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaperCollectionId.class);
        PaperCollectionId paperCollectionId1 = new PaperCollectionId();
        paperCollectionId1.setId(1L);
        PaperCollectionId paperCollectionId2 = new PaperCollectionId();
        paperCollectionId2.setId(paperCollectionId1.getId());
        assertThat(paperCollectionId1).isEqualTo(paperCollectionId2);
        paperCollectionId2.setId(2L);
        assertThat(paperCollectionId1).isNotEqualTo(paperCollectionId2);
        paperCollectionId1.setId(null);
        assertThat(paperCollectionId1).isNotEqualTo(paperCollectionId2);
    }
}
