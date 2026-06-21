package com.cims.backend.service;

import com.cims.backend.common.exception.BusinessException;
import com.cims.backend.common.exception.ErrorCode;
import com.cims.backend.dto.IncidentCreateRequest;
import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.dto.IncidentStatusUpdateRequest;
import com.cims.backend.entity.Incident;
import com.cims.backend.repository.IncidentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public List<IncidentResponse> getIncidents() {
        return incidentRepository.findAll()
                .stream()
                .map(IncidentResponse::from)
                .toList();
    }

    @Transactional
    public Long createIncident(IncidentCreateRequest request) {
        Incident incident = Incident.create(
                request.title(),
                request.content(),
                request.type(),
                request.severity(),
                request.location(),
                request.assignee()
        );

        return incidentRepository.save(incident).getId();
    }

    public IncidentResponse getIncident(Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.INCIDENT_NOT_FOUND));

        return IncidentResponse.from(incident);
    }

    @Transactional
    public IncidentResponse updateStatus(Long id, IncidentStatusUpdateRequest request) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.INCIDENT_NOT_FOUND));

        incident.updateStatus(request.status());

        return IncidentResponse.from(incident);
    }

    @Transactional
    public void deleteIncident(Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.INCIDENT_NOT_FOUND));

        incidentRepository.delete(incident);
    }
}