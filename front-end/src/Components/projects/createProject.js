
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Row, Col, Form, Card, Label, Input, CardBody, CardTitle, CardHeader } from "reactstrap"

const CreateProject = (props) => {
  const { toggleCanvas, canvasOpen } = props
  return (
    <div className="demo-inline-spacing">
      <Offcanvas direction={"end"} isOpen={canvasOpen} toggle={toggleCanvas}>
        <OffcanvasHeader toggle={toggleCanvas}>
          Create Project
        </OffcanvasHeader>
        <OffcanvasBody
          
        ><Form>
        <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
              Project Name
            </Label>
            <Input type='text' name='name' id='nameVertical' placeholder='First Name' />
          </Col>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
              Project Description
            </Label>
            <Input type='textfield' name='Email' id='EmailVertical' placeholder='Email' />
          </Col>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='mobileVertical'>
              Visibilty level
            </Label>
          </Col>
          
          <Col sm='12' className='mb-1'>
            <div className='form-check'>
              <Input type='radio' id='remember-me-vertical' defaultChecked={false} />
              <Label className='form-check-label' for='remember-me-vertical'>
                Private
              </Label>
            </div>
          </Col>
          <Col sm='12' className='mb-1'>
            <div className='form-check'>
              <Input type='radio' id='remember-me-vertical' defaultChecked={false} />
              <Label className='form-check-label' for='remember-me-vertical'>
                Internal
              </Label>
            </div>
          </Col>
          <Col sm='12' className='mb-1'>
            <div className='form-check'>
              <Input type='radio' id='remember-me-vertical' defaultChecked={false} />
              <Label className='form-check-label' for='remember-me-vertical'>
                Public
              </Label>
            </div>
          </Col>
          <Col sm='12'>
            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                Create
              </Button>
              <Button outline color='secondary' type='reset'>
               Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  )
}

export default CreateProject
