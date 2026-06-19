package com.cims.backend.service;

import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.repository.IncidentRepository;
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
}