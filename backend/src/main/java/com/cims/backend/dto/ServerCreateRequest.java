package com.cims.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record ServerCreateRequest(

        @NotBlank
        String name,

        @NotBlank
        String ipAddress,

        @Min(0)
        @Max(100)
        int cpuUsage,

        @Min(0)
        @Max(100)
        int memoryUsage,

        @Min(0)
        @Max(100)
        int diskUsage
) {
}