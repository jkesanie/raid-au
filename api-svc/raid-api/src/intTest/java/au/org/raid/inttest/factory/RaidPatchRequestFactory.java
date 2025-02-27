package au.org.raid.inttest.factory;

import au.org.raid.idl.raidv2.model.RaidDto;
import au.org.raid.idl.raidv2.model.RaidPatchRequest;
import org.springframework.stereotype.Component;

@Component
public class RaidPatchRequestFactory {
    public RaidPatchRequest create(final RaidDto raidDto) {
        return new RaidPatchRequest().contributor(raidDto.getContributor());
    }
}
