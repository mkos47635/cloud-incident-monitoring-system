package com.cims.backend.service;

import com.cims.backend.common.exception.BusinessException;
import com.cims.backend.common.exception.ErrorCode;
import com.cims.backend.dto.ServerCreateRequest;
import com.cims.backend.dto.ServerMetricUpdateRequest;
import com.cims.backend.dto.ServerResponse;
import com.cims.backend.entity.Incident;
import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.entity.IncidentType;
import com.cims.backend.entity.Server;
import com.cims.backend.entity.ServerStatus;
import com.cims.backend.repository.IncidentRepository;
import com.cims.backend.repository.ServerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServerService {

    private final ServerRepository serverRepository;
    private final IncidentRepository incidentRepository;

    public List<ServerResponse> getServers() {
        return serverRepository.findAll()
                .stream()
                .map(ServerResponse::from)
                .toList();
    }

    public ServerResponse getServer(Long id) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.SERVER_NOT_FOUND));

        return ServerResponse.from(server);
    }

    @Transactional
    public Long createServer(ServerCreateRequest request) {
        Server server = Server.create(
                request.name(),
                request.ipAddress(),
                request.cpuUsage(),
                request.memoryUsage(),
                request.diskUsage()
        );

        return serverRepository.save(server).getId();
    }

    @Transactional
    public ServerResponse updateMetrics(Long id, ServerMetricUpdateRequest request) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.SERVER_NOT_FOUND));

        ServerStatus status = determineStatus(
                request.cpuUsage(),
                request.memoryUsage(),
                request.diskUsage()
        );

        server.updateMetrics(
                request.cpuUsage(),
                request.memoryUsage(),
                request.diskUsage(),
                status
        );

        if (request.cpuUsage() >= 90 && !hasOpenCpuIncident(server)) {
            createCpuIncident(server, request.cpuUsage());
        }

        if (request.cpuUsage() < 90) {
            resolveCpuIncident(server);
        }

        return ServerResponse.from(server);
    }

    private ServerStatus determineStatus(
            int cpuUsage,
            int memoryUsage,
            int diskUsage
    ) {
        if (cpuUsage >= 90 || memoryUsage >= 90 || diskUsage >= 90) {
            return ServerStatus.CRITICAL;
        }

        if (cpuUsage >= 70 || memoryUsage >= 70 || diskUsage >= 70) {
            return ServerStatus.WARNING;
        }

        return ServerStatus.NORMAL;
    }

    private boolean hasOpenCpuIncident(Server server) {
        return incidentRepository.existsByTypeAndLocationAndStatusNotIn(
                IncidentType.SERVER,
                server.getName(),
                List.of(
                        IncidentStatus.RESOLVED,
                        IncidentStatus.CLOSED
                )
        );
    }

    private void createCpuIncident(Server server, int cpuUsage) {
        Incident incident = Incident.create(
                "CPU 사용률 임계치 초과",
                server.getName() + " 서버의 CPU 사용률이 "
                        + cpuUsage
                        + "%로 임계치 90%를 초과했습니다.",
                IncidentType.SERVER,
                IncidentSeverity.HIGH,
                server.getName(),
                "미지정"
        );

        incidentRepository.save(incident);
    }

    private void resolveCpuIncident(Server server) {
        incidentRepository.findFirstByTypeAndLocationAndStatusNotIn(
                IncidentType.SERVER,
                server.getName(),
                List.of(
                        IncidentStatus.RESOLVED,
                        IncidentStatus.CLOSED
                )
        ).ifPresent(Incident::resolve);
    }
}