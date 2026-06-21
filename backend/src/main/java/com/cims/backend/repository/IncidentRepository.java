package com.cims.backend.repository;

import com.cims.backend.entity.Incident;
import com.cims.backend.entity.IncidentStatus;
import com.cims.backend.entity.IncidentSeverity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    long countByStatusNotIn(Collection<IncidentStatus> statuses);

    long countBySeverityIn(Collection<IncidentSeverity> severities);

}