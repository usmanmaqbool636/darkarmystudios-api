import { useState } from 'react'
import { Row, Col, Button} from "reactstrap"
import CardProject from "../../Components/projects/card"
import CreateProject from '../../Components/projects/createProject'
import {Link} from "react-router-dom"
export default function Projects() {

  const [canvasOpen, setCanvasOpen] = useState(false)
  const toggleCanvas = () => {
    setCanvasOpen(!canvasOpen)
    console.log(canvasOpen)
  }

  return (
    <div>
      <div className="d-flex mb-2">
        <Button color="primary" onClick={toggleCanvas}>
          Add Project
        </Button>
      </div>
      <Row className="match-height">
        <Col lg="4" md="6" sm="12">
          <Link to="/task">
          <CardProject projectName={"Ideeza"} />
          </Link>
        </Col>
        <Col lg="4" md="6" sm="12">
        <Link to="/task">
          <CardProject projectName={"Personal AI"} />
        </Link>
        </Col>        
        <Col lg="4" md="6" sm="12">
        <Link to="/task">
          <CardProject projectName={"Clarify"} />
        </Link>
        </Col>
        <Col lg="4" md="6" sm="12">
        <Link to="/task">
          <CardProject projectName={"KVcore"} />
        </Link>
        </Col>
        <Col lg="4" md="6" sm="12">
        <Link to="/task">
          <CardProject projectName={"Preply"} />
        </Link>
        </Col>
      </Row>
      <CreateProject canvasOpen={canvasOpen} toggleCanvas={toggleCanvas}/>
    </div>
  )
}
