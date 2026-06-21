package com.cims.backend.dto;

public record DashboardResponse(
        int cpuUsage,
        int memoryUsage,
        int diskUsage,
        long unresolvedCount,
        long highSeverityCount
) {
}