import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import AddModal from "../AddModal/AddModal";
import "./AddButton.css";

export default function AddButtonApp({alertShower}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const toggleShowAddModal = () => setShowAddModal(!showAddModal);
  const { user } = useAuth();

  return (
    <React.Fragment>
      <Button
        id="post_button"
        className="add-button"
        disabled={user ? false : true}
        onClick={toggleShowAddModal}
      >
        Add New Position Listing
      </Button>
      <AddModal show={showAddModal} toggleShow={toggleShowAddModal} alertShower={alertShower}></AddModal>
    </React.Fragment>
  );
}
