package com.cims.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "servers")
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String ipAddress;

    @Column(nullable = false)
    private int cpuUsage;

    @Column(nullable = false)
    private int memoryUsage;

    @Column(nullable = false)
    private int diskUsage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServerStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.status = this.status == null ? ServerStatus.NORMAL : this.status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static Server create(
            String name,
            String ipAddress,
            int cpuUsage,
            int memoryUsage,
            int diskUsage
    ) {
        return Server.builder()
                .name(name)
                .ipAddress(ipAddress)
                .cpuUsage(cpuUsage)
                .memoryUsage(memoryUsage)
                .diskUsage(diskUsage)
                .build();
    }

    public void updateMetrics(
            int cpuUsage,
            int memoryUsage,
            int diskUsage,
            ServerStatus status
    ) {
        this.cpuUsage = cpuUsage;
        this.memoryUsage = memoryUsage;
        this.diskUsage = diskUsage;
        this.status = status;
    }
}