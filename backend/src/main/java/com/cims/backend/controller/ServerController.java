package com.cims.backend.controller;

import com.cims.backend.common.response.ApiResponse;
import com.cims.backend.dto.ServerCreateRequest;
import com.cims.backend.dto.ServerMetricUpdateRequest;
import com.cims.backend.dto.ServerResponse;
import com.cims.backend.service.ServerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servers")
@RequiredArgsConstructor
public class ServerController {

    private final ServerService serverService;

    @GetMapping
    public ApiResponse<List<ServerResponse>> getServers() {
        return ApiResponse.success(serverService.getServers());
    }

    @GetMapping("/{id}")
    public ApiResponse<ServerResponse> getServer(@PathVariable Long id) {
        return ApiResponse.success(serverService.getServer(id));
    }

    @PostMapping
    public ApiResponse<Long> createServer(
            @Valid @RequestBody ServerCreateRequest request
    ) {
        return ApiResponse.success(serverService.createServer(request));
    }

    @PatchMapping("/{id}/metrics")
    public ApiResponse<ServerResponse> updateMetrics(
            @PathVariable Long id,
            @Valid @RequestBody ServerMetricUpdateRequest request
    ) {
        return ApiResponse.success(
                serverService.updateMetrics(id, request)
        );
    }
}