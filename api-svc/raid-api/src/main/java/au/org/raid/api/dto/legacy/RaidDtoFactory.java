package au.org.raid.api.dto.legacy;

import au.org.raid.api.dto.LegacyRaid;
import au.org.raid.api.util.SchemaValues;
import au.org.raid.idl.raidv2.model.*;
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Component
public class RaidDtoFactory {
    private static final Map<String, String> DESCRIPTION_TYPE_MAP = Map.of(
            "Primary Description", DescriptionTypeIdEnum.HTTPS_VOCABULARY_RAID_ORG_DESCRIPTION_TYPE_SCHEMA_318.getValue(),
            "Alternative Description", DescriptionTypeIdEnum.HTTPS_VOCABULARY_RAID_ORG_DESCRIPTION_TYPE_SCHEMA_319.getValue()
    );

    private static final Map<String, String> TITLE_TYPE_MAP = Map.of(
            "Primary Title", TitleTypeIdEnum.HTTPS_VOCABULARY_RAID_ORG_TITLE_TYPE_SCHEMA_5.getValue(),
            "Alternative Title", TitleTypeIdEnum.HTTPS_VOCABULARY_RAID_ORG_TITLE_TYPE_SCHEMA_4.getValue()
    );

    private static final Map<String, String> ACCESS_TYPE_MAP = Map.of(
            "Open", AccessTypeIdEnum.HTTPS_VOCABULARIES_COAR_REPOSITORIES_ORG_ACCESS_RIGHTS_C_ABF2_.getValue(),
            "Closed", AccessTypeIdEnum.HTTPS_VOCABULARIES_COAR_REPOSITORIES_ORG_ACCESS_RIGHTS_C_F1CF_.getValue()
    );

    public RaidDto create(final LegacyRaid legacyRaid) {
        final var alternateUrls = legacyRaid.getAlternateUrls() != null ?
                legacyRaid.getAlternateUrls().stream()
                        .map(legacyAlternateUrl -> new AlternateUrl().url(legacyAlternateUrl.getUrl()))
                        .toList() : null;

        final var embargoExpiry = LocalDate.now().plusMonths(18);

        final var access = new Access()
                .type(
                        new AccessType()
                                .id(AccessTypeIdEnum.fromValue(legacyRaid.getAccess().getType()))
                                .schemaUri(AccessTypeSchemaUriEnum.HTTPS_VOCABULARIES_COAR_REPOSITORIES_ORG_ACCESS_RIGHTS_)
                )
                .embargoExpiry(legacyRaid.getAccess().getType().equals("Closed") ? embargoExpiry : null)
                .statement(new AccessStatement().text("Set to embargoed from closed during metadata uplift %s".formatted(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)))
                        .language(new Language().id("eng").schemaUri(LanguageSchemaURIEnum.HTTPS_WWW_ISO_ORG_STANDARD_74575_HTML)));


        return new RaidDto()
                .identifier(new Id()
                                .id(legacyRaid.getId().getIdentifier())
                                .owner(new Owner()
                                        .schemaUri(RegistrationAgencySchemaURIEnum.HTTPS_ROR_ORG_)
                                        .id(legacyRaid.getId().getIdentifierOwner())
                                        .servicePoint(BigDecimal.valueOf(legacyRaid.getId().getIdentifierServicePoint()))
                                )
                                .license("Creative Commons CC-0")
                                .schemaUri(RaidIdentifierSchemaURIEnum.HTTPS_RAID_ORG_)
                                .registrationAgency(new RegistrationAgency()
                                        .id(legacyRaid.getId().getRaidAgencyUrl())
                                        .schemaUri(RegistrationAgencySchemaURIEnum.HTTPS_ROR_ORG_))
                                .version(legacyRaid.getId().getVersion())
                        // TODO: set raidAgencyUrl depending on environment

                )
                .title(legacyRaid.getTitles().stream().map(legacyTitle ->
                        new Title()
                                .text(legacyTitle.getTitle())
                                .type(new TitleType()
                                        .id(TitleTypeIdEnum.fromValue(legacyTitle.getType()))
                                        .schemaUri(TitleTypeSchemaURIEnum.HTTPS_VOCABULARY_RAID_ORG_TITLE_TYPE_SCHEMA_376))
                                .startDate(legacyTitle.getStartDate())
                                .endDate(legacyTitle.getEndDate())

                ).toList())
                .description(legacyRaid.getDescriptions().stream()
                        .map(legacyDescription ->
                                new Description()
                                        .text(legacyDescription.getDescription())
                                        .type(new DescriptionType()
                                                .schemaUri(DescriptionTypeSchemaURIEnum.HTTPS_VOCABULARY_RAID_ORG_DESCRIPTION_TYPE_SCHEMA_320)
                                                .id(DescriptionTypeIdEnum.fromValue(legacyDescription.getType())))
                        ).toList()
                )
                .date(new Date()
                        .startDate(legacyRaid.getDates().getStartDate())
                        .endDate(legacyRaid.getDates().getEndDate())
                )
                .alternateUrl(alternateUrls)
                .access(access);
    }

}
