import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { updateDatabase } from "../../utilities/firebase";
import "./ViewModal.css";

const ViewModal = ({ applicationData, show, toggleShow }) => {
  const { user, setUserFromDatabase } = useAuth();
  const [isSaved, setIsSaved] = useState(
    user && user.jobsSaved
      ? user.jobsSaved.some((jobId) => jobId === applicationData.jobId)
      : false
  );
  const [hasApplied, setHasApplied] = useState(
    user && user.jobsApplied
      ? user.jobsApplied.some((jobId) => jobId === applicationData.jobId)
      : false
  );

  const saveJob = () => {
    if (!user) return;

    const updates = {};
    let userSavedJobs = user.jobsSaved ? user.jobsSaved : [];
    userSavedJobs.push(applicationData.jobId);
    updates["users/" + user.userId + "/jobsSaved"] = userSavedJobs;
    updateDatabase(updates);
    setUserFromDatabase(user.userId);

    setIsSaved(!isSaved);
  };

  const unsaveJob = () => {
    if (!user) return;

    const updates = {};
    let userSavedJobs = user.jobsSaved ? user.jobsSaved : [];
    userSavedJobs = userSavedJobs.filter(
      (jobId) => jobId !== applicationData.jobId
    );
    updates["users/" + user.userId + "/jobsSaved"] = userSavedJobs;
    updateDatabase(updates);
    setUserFromDatabase(user.userId);

    setIsSaved(!isSaved);
  };

  const applyToJob = () => {
    if (!user) return;

    const updates = {};
    let userAppliedJobs = user.jobsApplied ? user.jobsApplied : [];
    userAppliedJobs.push(applicationData.jobId);
    updates["users/" + user.userId + "/jobsApplied"] = userAppliedJobs;
    updateDatabase(updates);
    setUserFromDatabase(user.userId);

    setHasApplied(!hasApplied);
  };

  return (
    <Modal show={show} onHide={toggleShow} className="modal">
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title>
          {isSaved ? (
            <FontAwesomeIcon icon={bookmarkSolid} onClick={unsaveJob} />
          ) : (
            <FontAwesomeIcon icon={bookmarkRegular} onClick={saveJob} />
          )}
          &nbsp;
          {applicationData.projectName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body">
        <h5>Details</h5>
        <Row>
          <Col lg={6} sm={12}>
            <b>Position Name:</b> {applicationData.positionName || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>Wage ($/hr):</b> {applicationData.wage || "0"}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Type of Project:</b> {applicationData.typeOfProject || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>No. of People:</b> {applicationData.numberOfPeople || "N/A"}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Project Start Date:</b> {applicationData.projectStartDate || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>Project End Date:</b> {applicationData.projectEndDate || "N/A"}
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <b>Date Posted:</b> {applicationData.datePosted || "N/A"}
          </Col>
          <Col lg={6} sm={12}>
            <b>Application Deadline:</b> {applicationData.dateToSubmit || "N/A"}
          </Col>
        </Row>
        <hr />
        <h5>Description</h5>
        <p>{applicationData.description || "No description found."}</p>
        <hr />
        <h5>Skills</h5>
        <ul className="skills">
          {applicationData.skillsRequired.map((skill, id) => {
            return (
              <li className="skill" key={id}>
                {skill}
              </li>
            );
          })}
        </ul>
        <hr />
        <h5>Hashtags</h5>
        <ul className="skills">
          {applicationData.hashtags.map((hashtag, id) => {
            return (
              <li className="skill" key={id}>
                {hashtag}
              </li>
            );
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <p>
          <b>Contact Info:</b>{" "}
          <a href={"mailto:" + applicationData.contactInfo}>
            {applicationData.contactInfo}
          </a>
        </p>
        {hasApplied ? (
          <Button variant="secondary" onClick={toggleShow} disabled={true}>
            Applied <FontAwesomeIcon icon={faCheck} />
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: "blueviolet",
              border: "none",
            }}
            onClick={applyToJob}
          >
            Apply
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "blueviolet",
            border: "none",
          }}
          onClick={toggleShow}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/*

project name, type of project, position name, description, wage, deadline, posted date, 
contactinfo, job timeline, number of people, skills required

*/

export default ViewModal;
