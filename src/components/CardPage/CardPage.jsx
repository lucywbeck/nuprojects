import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { useDbData } from "../../utilities/firebase";
import AddButton from "../AddButton/AddButton";
import CardApp from "./Card";
import "./CardPage.css";
import Alert from 'react-bootstrap/Alert';

export default function CardPageApp() {
  const [data, error] = useDbData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortKey, setSortKey] = useState("datePosted");
  const [showAlert, setShowAlert] = useState(false);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const sortComparator = useCallback(
    (a, b) => {
      if (!a || !b) {
        return 0;
      }
      return new Date(a[sortKey]) - new Date(b[sortKey]);
    },
    [sortKey]
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    let filteredJobs = Object.values(data.jobs).filter((job) => {
      return (
        job.positionName.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.projectName.toLowerCase().includes(search.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        ) ||
        job.hashtags.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase())
        )
      );
    });

    if (filters.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.skillsRequired.some((skill) => filters.includes(skill));
      });
    }

    setFilteredJobs(filteredJobs.sort(sortComparator));
  }, [data, search, sortComparator, filters]);

  const handleFiltersChange = (selectedOptions) => {
    setFilters(selectedOptions.selectedValue);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };
  //apply style to mobile view only
  const styleRow = {
    '@media (max-width: 600px)': {
        gap: "15px"
    }
}


  const renderSearchArea = () => {
    return (
      <div className="search-area">
        <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
          <Row style={styleRow}>
            <Form.Group as={Col} md={8}>
              <Form.Control
                type="search"
                placeholder="Search positions..."
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Select onChange={handleSortChange}>
                <option value="datePosted" defaultChecked>
                  Sort by date posted
                </option>
                <option value="dateToSubmit" defaultChecked>
                  Sort by application deadline
                </option>
                <option value="projectStartDate">Sort by start date</option>
                <option value="projectEndDate">Sort by end date</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <BootstrapSelect
                className="filter-multi-select"
                isMultiSelect
                showTicks
                showSearch
                placeholder="Filter by skills"
                selectStyle="btn btn-primary"
                // add options of Javascript, Python, HTML/CSS, Java, C, C++, C#, Git, SQL, Agile
                // Scrum, React, Node.js, AWS, Azure, Kubernetes
                // list options in alphabetical order of labelkey
                options={[
                  {
                    labelKey: "agile",
                    value: "Agile",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "aws",
                    value: "AWS",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "azure",
                    value: "Azure",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "c",
                    value: "C",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "c#",
                    value: "C#",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "c++",
                    value: "C++",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "git",
                    value: "Git",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "html/css",
                    value: "HTML/CSS",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "java",
                    value: "Java",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "javascript",
                    value: "JavaScript",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "node.js",
                    value: "Node.js",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "python",
                    value: "Python",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "react",
                    value: "React",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "scrum",
                    value: "Scrum",
                    style: { fontSize: "15px" },
                  },
                  {
                    labelKey: "sql",
                    value: "SQL",
                    style: { fontSize: "15px" },
                  },
                ]}
                onChange={handleFiltersChange}
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <Container fluid className="px-4 py-4 d-flex flex-column gap-3">
      {renderSearchArea()}
      <AddButton alertShower={setShowAlert} />
      <Alert variant="success" show={showAlert}>
        Job successfully added!
      </Alert>
      <div className="d-flex flex-column gap-3">
        {filteredJobs.map((job, key) => (
          <CardApp key={key} data={job} />
        ))}
      </div>
    </Container>
  );
}
