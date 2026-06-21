package com.cims.backend.controller;

import com.cims.backend.common.response.ApiResponse;
import com.cims.backend.dto.IncidentCreateRequest;
import com.cims.backend.dto.IncidentResponse;
import com.cims.backend.dto.IncidentStatusUpdateRequest;
import com.cims.backend.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public ApiResponse<List<IncidentResponse>> getIncidents() {
        return ApiResponse.success(
                incidentService.getIncidents()
        );
    }

    @PostMapping
    public ApiResponse<Long> createIncident(
            @Valid @RequestBody IncidentCreateRequest request
    ) {
        return ApiResponse.success(
                incidentService.createIncident(request)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<IncidentResponse> getIncident(
            @PathVariable Long id
    ) {
        return ApiResponse.success(
                incidentService.getIncident(id)
        );
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<IncidentResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody IncidentStatusUpdateRequest request
    ) {
        return ApiResponse.success(
                incidentService.updateStatus(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteIncident(
            @PathVariable Long id
    ) {
        incidentService.deleteIncident(id);
        return ApiResponse.success();
    }
}