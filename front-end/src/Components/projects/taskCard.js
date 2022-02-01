// ** Third Party Components
import classnames from 'classnames'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText, Badge, Button } from 'reactstrap'

const TaskCard = () => {
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

//   const designPlanningArr = [
//     {
//       title: 'Due Date',
//       subtitle: '12 Apr, 21'
//     },
//     {
//       title: 'Budget',
//       subtitle: '$49251.91'
//     },
//     {
//       title: 'Cost',
//       subtitle: '$840.99'
//     }
//   ]

  return (
    <Card className='card-app-design'>
      <CardBody>
        <Badge color='light-primary'>03 Sep, 20</Badge>
        <CardTitle className='text-black'>App design</CardTitle>
        <CardText className='font-small-2 mb-2 text-black'>
          You can Find Only Post and Quotes Related to IOS like ipad app design, iphone app design
        </CardText>
        <div className='design-group mb-2'>
          <h6 className='section-label'>Team</h6>
          <Badge className='me-1' color='light-warning'>
            Figma
          </Badge>
          <Badge color='light-primary'>Wireframe</Badge>
        </div>
        <div className='design-group '>
          <h6 className='section-label'>Members</h6>
          {avatarArr.map((obj, index) => {
            return <Avatar key={index} className={classnames({ 'me-75': index !== avatarArr.length - 1 })} {...obj} />
          })}
        </div>
        {/* <div className='design-planning-wrapper mb-2 py-75'>
          {designPlanningArr.map(item => (
            <div key={item.title} className='design-planning'>
              <CardText className=''>{item.title}</CardText>
              <h6 className='mb-0'>{item.subtitle}</h6>
            </div>
          ))}
        </div> */}
        <div className='d-grid'>
          <Button color='primary'>Detail</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default TaskCard
