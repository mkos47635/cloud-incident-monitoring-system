package com.cims.backend.service;

import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import com.cims.backend.dto.IncidentCreateRequest;
import com.cims.backend.entity.Incident;

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

}