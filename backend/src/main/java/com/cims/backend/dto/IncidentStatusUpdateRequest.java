package com.cims.backend.dto;

import com.cims.backend.entity.IncidentStatus;
import jakarta.validation.constraints.NotNull;

public record IncidentStatusUpdateRequest(
        @NotNull
        IncidentStatus status
) {
}