package com.cims.backend.service;

import com.cims.backend.dto.DashboardResponse;
import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.entity.Server;
import com.cims.backend.repository.IncidentRepository;
import com.cims.backend.repository.ServerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncidentRepository incidentRepository;
    private final ServerRepository serverRepository;

    public DashboardResponse getDashboard() {
        long unresolvedCount = incidentRepository.countByStatusNotIn(
                List.of(IncidentStatus.RESOLVED, IncidentStatus.CLOSED)
        );

        long highSeverityCount = incidentRepository.countBySeverityIn(
                List.of(IncidentSeverity.HIGH, IncidentSeverity.CRITICAL)
        );

        Server server = serverRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        if (server == null) {
            return new DashboardResponse(
                    0,
                    0,
                    0,
                    unresolvedCount,
                    highSeverityCount
            );
        }

        return new DashboardResponse(
                server.getCpuUsage(),
                server.getMemoryUsage(),
                server.getDiskUsage(),
                unresolvedCount,
                highSeverityCount
        );
    }
}