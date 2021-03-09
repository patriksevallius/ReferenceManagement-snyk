package org.contextmapper.generated.referencemanagementcontext.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PaperItemIdMapperTest {

    private PaperItemIdMapper paperItemIdMapper;

    @BeforeEach
    public void setUp() {
        paperItemIdMapper = new PaperItemIdMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(paperItemIdMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(paperItemIdMapper.fromId(null)).isNull();
    }
}
