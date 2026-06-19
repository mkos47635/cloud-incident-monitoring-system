package com.cims.backend.dto;

import com.cims.backend.entity.Incident;
import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.entity.IncidentType;

import java.time.LocalDateTime;

public record IncidentResponse(
        Long id,
        String title,
        String content,
        IncidentType type,
        IncidentSeverity severity,
        IncidentStatus status,
        String location,
        String assignee,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static IncidentResponse from(Incident incident) {
        return new IncidentResponse(
                incident.getId(),
                incident.getTitle(),
                incident.getContent(),
                incident.getType(),
                incident.getSeverity(),
                incident.getStatus(),
                incident.getLocation(),
                incident.getAssignee(),
                incident.getCreatedAt(),
                incident.getUpdatedAt()
        );
    }
}