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

    // 대시보드에 표시할 서버 상태 및 장애 현황 정보를 조회.
    public DashboardResponse getDashboard() {

        // 해결되지 않은 장애 건수 조회
        long unresolvedCount = incidentRepository.countByStatusNotIn(
                List.of(IncidentStatus.RESOLVED, IncidentStatus.CLOSED)
        );

        // HIGH 이상 등급의 장애 건수 조회
        long highSeverityCount = incidentRepository.countBySeverityIn(
                List.of(IncidentSeverity.HIGH, IncidentSeverity.CRITICAL)
        );

        // 현재는 첫 번째 서버 정보를 대시보드 대표 서버로 사용
        Server server = serverRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        // 등록된 서버가 없는 경우 기본값 반환
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