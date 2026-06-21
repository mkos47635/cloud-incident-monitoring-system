package com.cims.backend.dto;

import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IncidentCreateRequest(

        @NotBlank
        String title,

        @NotBlank
        String content,

        @NotNull
        IncidentType type,

        @NotNull
        IncidentSeverity severity,

        @NotBlank
        String location,

        @NotBlank
        String assignee
) {
}