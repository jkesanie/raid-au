package au.org.raid.api.validator;

import au.org.raid.api.util.TestConstants;
import au.org.raid.idl.raidv2.model.AccessStatement;
import au.org.raid.idl.raidv2.model.Language;
import au.org.raid.idl.raidv2.model.LanguageSchemaURIEnum;
import au.org.raid.idl.raidv2.model.ValidationFailure;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.empty;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccessStatementValidatorTest {
    @Mock
    private LanguageValidator languageValidator;

    @InjectMocks
    private AccessStatementValidator validationService;

    @Test
    @DisplayName("Valid access statement returns no errors")
    void validAccessStatement() {
        final var language = new Language()
                .id(TestConstants.LANGUAGE_ID)
                .schemaUri(LanguageSchemaURIEnum.HTTPS_WWW_ISO_ORG_STANDARD_74575_HTML);

        when(languageValidator.validate(language, "access.statement"))
                .thenReturn(Collections.emptyList());

        final var accessStatement = new AccessStatement()
                .text("Embargoed")
                .language(language);

        final var failures = validationService.validate(accessStatement);

        assertThat(failures, empty());
        verify(languageValidator).validate(language, "access.statement");
    }

}