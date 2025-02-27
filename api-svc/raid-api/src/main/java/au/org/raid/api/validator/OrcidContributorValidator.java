package au.org.raid.api.validator;

import au.org.raid.idl.raidv2.model.Contributor;
import au.org.raid.idl.raidv2.model.ValidationFailure;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static au.org.raid.api.endpoint.message.ValidationMessage.*;
import static org.apache.commons.lang3.StringUtils.isBlank;

@Component
@RequiredArgsConstructor
public class OrcidContributorValidator {
    private static final String ORCID_ORG = "https://orcid.org/";
    private final OrcidValidator orcidValidator;

    public List<ValidationFailure> validate(final Contributor contributor, final Integer index) {
        final var failures = new ArrayList<ValidationFailure>();

        if (isBlank(contributor.getSchemaUri())) {
            failures.add(
                    new ValidationFailure()
                            .fieldId("contributor[%d].schemaUri".formatted(index))
                            .errorType(NOT_SET_TYPE)
                            .message(NOT_SET_MESSAGE)
            );
        } else if (!contributor.getSchemaUri().equals(ORCID_ORG)) {
            failures.add(new ValidationFailure()
                    .fieldId("contributor[%d].schemaUri".formatted(index))
                    .errorType(INVALID_VALUE_TYPE)
                    .message(INVALID_VALUE_MESSAGE + " - should be " + ORCID_ORG)
            );
        }

        failures.addAll(orcidValidator.validate(contributor.getId(), index));

        return failures;
    }
}
