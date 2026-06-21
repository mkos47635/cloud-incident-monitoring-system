package com.cims.backend.controller;

import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.dto.IncidentStatusUpdateRequest;
import com.cims.backend.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import com.cims.backend.dto.IncidentCreateRequest;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public List<IncidentResponse> getIncidents() {
        return incidentService.getIncidents();
    }

    @PostMapping
    public Long createIncident(
            @Valid @RequestBody IncidentCreateRequest request
    ) {
        return incidentService.createIncident(request);
    }

    @GetMapping("/{id}")
    public IncidentResponse getIncident(@PathVariable Long id) {
        return incidentService.getIncident(id);
    }

    @PatchMapping("/{id}/status")
    public IncidentResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody IncidentStatusUpdateRequest request
    ) {
        return incidentService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
    }


}