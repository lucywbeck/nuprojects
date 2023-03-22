import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { useDbData } from "../../utilities/firebase";
import { useAuth } from "../../hooks/useAuth";
import CardApp from "../CardPage/Card";

export default function AppliedPageApp() {
  const { user } = useAuth();
  const [data, error] = useDbData();

  if (user && data) {
    let appliedJobIds = user.jobsApplied ? user.jobsApplied : [];
    let filteredJobs = Object.values(data.jobs).filter((job) => {
      return (
        appliedJobIds.includes(job.jobId)
      );
    });
      
    return (
      <Container fluid className="px-4 py-4 d-flex flex-column gap-3">
        <h1>Applied</h1>
        <div className="d-flex flex-column gap-3">
          {filteredJobs.map((job, key) => (
            <CardApp key={key} data={job} />
          ))}
        </div>
      </Container>
    );

  }
  
}
