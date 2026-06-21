package com.cims.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record ServerMetricUpdateRequest(

        int cpuUsage,
        int memoryUsage,
        int diskUsage
) {
}