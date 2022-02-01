
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap"

const CreateProject = (props) => {
  const { toggleCanvas, canvasOpen } = props
  return (
    <div className="demo-inline-spacing">
      <Offcanvas direction={"end"} isOpen={canvasOpen} toggle={toggleCanvas}>
        <OffcanvasHeader toggle={toggleCanvas}>
          Create Project
        </OffcanvasHeader>
        <OffcanvasBody
          
        >
          <p
            
          >
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.
          </p>
          <Button
            color="primary"
          >
            Continue
          </Button>
          <Button
            outline
            color="secondary"
            >
            Cancel
          </Button>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  )
}

export default CreateProject
