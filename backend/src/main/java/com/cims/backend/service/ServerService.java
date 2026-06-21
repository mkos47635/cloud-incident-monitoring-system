package com.cims.backend.service;

import com.cims.backend.dto.ServerCreateRequest;
import com.cims.backend.dto.ServerResponse;
import com.cims.backend.entity.Server;
import com.cims.backend.repository.ServerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.cims.backend.common.exception.BusinessException;
import com.cims.backend.common.exception.ErrorCode;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServerService {

    private final ServerRepository serverRepository;

    public List<ServerResponse> getServers() {
        return serverRepository.findAll()
                .stream()
                .map(ServerResponse::from)
                .toList();
    }

    public ServerResponse getServer(Long id) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.SERVER_NOT_FOUND));

        return ServerResponse.from(server);
    }

    @Transactional
    public Long createServer(ServerCreateRequest request) {
        Server server = Server.create(
                request.name(),
                request.ipAddress(),
                request.cpuUsage(),
                request.memoryUsage(),
                request.diskUsage()
        );

        return serverRepository.save(server).getId();
    }
}