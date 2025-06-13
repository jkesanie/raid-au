package au.org.raid.api.factory.record;

import au.org.raid.db.jooq.tables.records.ServicePointRecord;
import au.org.raid.idl.raidv2.model.ServicePointCreateRequest;
import au.org.raid.idl.raidv2.model.ServicePointUpdateRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ServicePointRecordFactory {
    public ServicePointRecord create(final ServicePointUpdateRequest servicePoint) {
        return new ServicePointRecord()
                .setId(servicePoint.getId())
                .setName(servicePoint.getName())
                .setIdentifierOwner(servicePoint.getIdentifierOwner())
                .setAdminEmail(servicePoint.getAdminEmail())
                .setTechEmail(servicePoint.getTechEmail())
                .setAppWritesEnabled(servicePoint.getAppWritesEnabled())
                .setEnabled(servicePoint.getEnabled())
                .setRepositoryId(servicePoint.getRepositoryId())
                .setPrefix(servicePoint.getPrefix())
                .setPassword(servicePoint.getPassword())
                .setGroupId(servicePoint.getGroupId());
    }

    public ServicePointRecord create(final ServicePointCreateRequest servicePoint) {

        final var identifierOwner = Optional.ofNullable(servicePoint.getIdentifierOwner())
                .map(String::trim)
                .orElse(null);

        final var adminEmail = Optional.ofNullable(servicePoint.getAdminEmail())
                .map(String::trim)
                .orElse(null);

        final var techEmail = Optional.ofNullable(servicePoint.getTechEmail())
                .map(String::trim)
                .orElse(null);

        final var repositoryId = Optional.ofNullable(servicePoint.getRepositoryId())
                .map(String::trim)
                .orElse(null);

        final var prefix = Optional.ofNullable(servicePoint.getPrefix())
                .map(String::trim)
                .orElse(null);

        final var groupId = Optional.ofNullable(servicePoint.getGroupId())
                .map(String::trim)
                .orElse(null);

        return new ServicePointRecord()
                .setName(servicePoint.getName())
                .setIdentifierOwner(identifierOwner)
                .setAdminEmail(adminEmail)
                .setTechEmail(techEmail)
                .setAppWritesEnabled(servicePoint.getAppWritesEnabled())
                .setEnabled(servicePoint.getEnabled())
                .setRepositoryId(repositoryId)
                .setPrefix(prefix)
                .setPassword(servicePoint.getPassword())
                .setGroupId(groupId);
    }
}
