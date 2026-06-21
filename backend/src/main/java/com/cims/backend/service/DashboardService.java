package com.cims.backend.service;

import com.cims.backend.dto.DashboardResponse;
import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncidentRepository incidentRepository;

    public DashboardResponse getDashboard() {
        long unresolvedCount = incidentRepository.countByStatusNotIn(
                List.of(IncidentStatus.RESOLVED, IncidentStatus.CLOSED)
        );

        long highSeverityCount = incidentRepository.countBySeverityIn(
                List.of(IncidentSeverity.HIGH, IncidentSeverity.CRITICAL)
        );

        return new DashboardResponse(
                72,
                58,
                64,
                unresolvedCount,
                highSeverityCount
        );
    }
}