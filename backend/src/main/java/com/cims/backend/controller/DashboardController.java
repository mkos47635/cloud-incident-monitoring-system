package com.cims.backend.controller;

import com.cims.backend.common.response.ApiResponse;
import com.cims.backend.dto.DashboardResponse;
import com.cims.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ApiResponse<DashboardResponse> getDashboard() {
        return ApiResponse.success(
                dashboardService.getDashboard()
        );
    }
}