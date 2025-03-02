package au.org.raid.api.controller;

import au.org.raid.api.service.RaidHistoryService;
import au.org.raid.api.service.RaidIngestService;
import au.org.raid.api.service.RaidV3UpgradeService;
import au.org.raid.idl.raidv2.model.RaidDto;
import au.org.raid.idl.raidv2.model.RaidUpdateRequest;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@SecurityScheme(name = "bearerAuth", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class V3UpgradeController {
    private final RaidV3UpgradeService upgradeService;
    private final RaidHistoryService raidHistoryService;
    private final RaidIngestService raidIngestService;

    @GetMapping("/upgradable/all")
    public List<RaidDto> findAllUpgradable() {
        return upgradeService.upgrade();
    }

    @PostMapping("/upgrade")
    public ResponseEntity<RaidDto> upgrade(@RequestBody final RaidUpdateRequest request) {
        final var raidDto = raidHistoryService.save(request);

        return ResponseEntity.ok(raidIngestService.update(raidDto));
    }
}
