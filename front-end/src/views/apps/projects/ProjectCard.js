// ** Third Party Components
import classnames from 'classnames'
import moment from "moment"
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText, Badge, Button } from 'reactstrap'

const CardAppDesign = ({ item, handleProjectClick }) => {
  // this should come from parent
  const avatarArr = [
    {
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      imgHeight: 34,
      imgWidth: 34
    },
    {
      content: 'PI',
      color: 'light-danger'
    },
    {
      img: require('@src/assets/images/portrait/small/avatar-s-14.jpg').default,
      imgHeight: 34,
      imgWidth: 34
    },
    {
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
      imgHeight: 34,
      imgWidth: 34
    },
    {
      content: 'AL',
      color: 'light-secondary'
    }
  ]
  // this should come from parent
  const designPlanningArr = [
    {
      title: 'Due Date',
      subtitle: '12 Apr, 21'
    },
    {
      title: 'Budget',
      subtitle: '$49251.91'
    },
    {
      title: 'Cost',
      subtitle: '$840.99'
    }
  ]

  return (
    <Card
     onClick={() => handleProjectClick(item)}
     className='card-app-design card-app-design-custom'  >
      <CardBody>
        <Badge color='light-primary'>{moment(item.createdAt).format('DD MMM, YYYY')}</Badge>
        <CardTitle className='mt-1 mb-75'>{item.title}</CardTitle>
        <CardText className='font-small-2 mb-2'>
          You can Find Only Post and Quotes Related to IOS like ipad app design, iphone app design
        </CardText>
        <div className='design-group mb-2 pt-50'>
          <h6 className='section-label'>Team</h6>
          {item.tags.map(tag=>(
            <Badge key={`tag-${tag}-${item.id}`} className='me-1' color='light-warning'>

              {tag}
            </Badge>
          ))}
        </div>
        <div className='design-group pt-25'>
          <h6 className='section-label'>Members</h6>
          {/* members come from parent [avatar] */}
          {item.assignee.map((obj, index) => {
            return <Avatar key={`ProjectCard-assignee-${obj.label}-${index}`} className={classnames({ 'me-75': index !== avatarArr.length - 1 })} {...obj} />
          })}
        </div>
        <div className='design-planning-wrapper mb-2 py-75'>
          {designPlanningArr.map((item, index) => (
            <div key={`designPlanningArr-${item.title}-${index}`} className='design-planning'>
              <CardText className='mb-25'>{item.title}</CardText>
              <h6 className='mb-0'>{item.subtitle}</h6>
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-around'>
          {/* TODO propagation*/}
          {/* get help from this stackoverflow Question */}
        {/* https://stackoverflow.com/questions/63411940/how-to-create-two-onclick-events-on-a-clickable-cards-in-react */}
          <Button color='primary'>Join Team</Button>
          <Button color='secondary'>Add Taks</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardAppDesign
