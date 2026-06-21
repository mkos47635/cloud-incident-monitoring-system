package com.cims.backend.dto;

import com.cims.backend.entity.Server;
import com.cims.backend.entity.ServerStatus;

import java.time.LocalDateTime;

public record ServerResponse(
        Long id,
        String name,
        String ipAddress,
        int cpuUsage,
        int memoryUsage,
        int diskUsage,
        ServerStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ServerResponse from(Server server) {
        return new ServerResponse(
                server.getId(),
                server.getName(),
                server.getIpAddress(),
                server.getCpuUsage(),
                server.getMemoryUsage(),
                server.getDiskUsage(),
                server.getStatus(),
                server.getCreatedAt(),
                server.getUpdatedAt()
        );
    }
}