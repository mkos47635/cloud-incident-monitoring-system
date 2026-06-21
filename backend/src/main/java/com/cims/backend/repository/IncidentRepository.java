package com.cims.backend.repository;

import com.cims.backend.entity.Incident;
import com.cims.backend.entity.IncidentSeverity;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.entity.IncidentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    long countByStatusNotIn(Collection<IncidentStatus> statuses);

    long countBySeverityIn(Collection<IncidentSeverity> severities);

    boolean existsByTypeAndLocationAndStatusNotIn(
            IncidentType type,
            String location,
            Collection<IncidentStatus> statuses
    );

    Optional<Incident> findFirstByTypeAndLocationAndStatusNotIn(
            IncidentType type,
            String location,
            Collection<IncidentStatus> statuses
    );
}