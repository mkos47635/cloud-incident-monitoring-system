package com.cims.backend.controller;

import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}