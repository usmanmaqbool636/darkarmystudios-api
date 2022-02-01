import { useState } from 'react'
import { Row, Col, Button} from "reactstrap"
import CardProject from "../../Components/projects/card"
import CreateProject from '../../Components/projects/createProject'
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
          <CardProject projectName={"Ideeza"} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <CardProject projectName={"Personal AI"} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <CardProject projectName={"Clarify"} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <CardProject projectName={"KVcore"} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <CardProject projectName={"Preply"} />
        </Col>
      </Row>
      <CreateProject canvasOpen={canvasOpen} toggleCanvas={toggleCanvas}/>
    </div>
  )
}
