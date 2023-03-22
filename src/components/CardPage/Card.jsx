import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ViewModal from "../ViewModal/ViewModal";
import "./Card.css";

export default function CardApp({ data }) {
  const [showViewModal, setShowViewModal] = useState(false);
  const toggleShowViewModal = () => setShowViewModal(!showViewModal);

  return (
    <>
      <Card className="job-card">
        <Card.Header>
          <b>{data.projectName}</b> | {data.numberOfPeople} member(s)
        </Card.Header>
        <Card.Body>
          <Card.Title>{data.positionName}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <ul className="skills">
            {data.skillsRequired.map((skill, id) => {
              return (
                <li className="skill" key={id}>
                  {skill}
                </li>
              );
            })}
          </ul>
          <ul className="skills">
            {data.hashtags.map((hashtag, id) => {
              return (
                <li className="skill" key={id}>
                  {hashtag}
                </li>
              );
            })}
          </ul>
          <Button onClick={toggleShowViewModal} variant="primary">
            See more
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Date posted: {data.datePosted} | Application Deadline: {data.dateToSubmit}
        </Card.Footer>
      </Card>
      <ViewModal
        applicationData={data}
        show={showViewModal}
        toggleShow={toggleShowViewModal}
      />
    </>
  );
}
