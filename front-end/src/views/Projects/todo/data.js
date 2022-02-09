const tasks = [
    {
      id: 1,
      title: 'Entire change break our wife wide it daughter mention member.',
      dueDate: '2020-11-25',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Jacob Ramirez',
        avatar: require('@src/assets/images/avatars/12.png').default
      },
      tags: ['update'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 2,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Andrew Anderson',
        avatar: ''
      },
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 3,
      title: 'Meet Jane and ask for coffee ❤️',
      dueDate: '2020-11-25',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Benjamin Jacobs',
        avatar: ''
      },
      tags: ['high'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 4,
      title: 'Answer the support tickets and close completed tickets. ',
      dueDate: '2020-11-20',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Curtis Schmidt',
        avatar: require('@src/assets/images/avatars/9.png').default
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 5,
      title: 'Test functionality of apps developed by dev team for enhancements. ',
      dueDate: '2020-12-06',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Katherine Perkins',
        avatar: require('@src/assets/images/avatars/9.png').default
      },
      tags: ['medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 6,
      title: 'Conduct a mini awareness meeting regarding health care. ',
      dueDate: '2020-12-06',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'David Murphy',
        avatar: ''
      },
      tags: ['high', 'medium'],
      isCompleted: true,
      isDeleted: true,
      isImportant: false
    },
    {
      id: 7,
      title: 'Plan new dashboard design with design team for Google app store. ',
      dueDate: '2020-12-05',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Karina Miller',
        avatar: require('@src/assets/images/avatars/1.png').default
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 8,
      title: 'Pick up Nats from her school and drop at dance class😁 ',
      dueDate: '2020-12-08',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Thomas Moses',
        avatar: require('@src/assets/images/avatars/7.png').default
      },
      tags: ['low', 'medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 9,
      title: 'Finish documentation and make it live',
      dueDate: '2020-11-25',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Angel Morrow',
        avatar: ''
      },
      tags: ['high', 'update'],
      isCompleted: false,
      isDeleted: true,
      isImportant: false
    },
    {
      id: 10,
      title: 'List out all the SEO resources and send it to new SEO team. ',
      dueDate: '2020-12-09',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Karen Carrillo',
        avatar: ''
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 11,
      title: 'Refactor Code and fix the bugs and test it on server ',
      dueDate: '2020-12-01',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Timothy Brewer',
        avatar: require('@src/assets/images/avatars/1.png').default
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 12,
      title: 'Reminder to mail clients for holidays',
      dueDate: '2020-12-09',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Brian Barry',
        avatar: ''
      },
      tags: ['team'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 13,
      title: "Submit quotation for Abid's ecommerce website and admin project",
      dueDate: '2020-12-01',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Joshua Golden',
        avatar: require('@src/assets/images/avatars/5.png').default
      },
      tags: ['team'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 14,
      title: 'Send PPT with real-time reports',
      dueDate: '2020-11-29',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Paula Hammond',
        avatar: require('@src/assets/images/avatars/5.png').default
      },
      tags: ['medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true
    },
    {
      id: 15,
      title: 'Skype Tommy for project status & report',
      dueDate: '2020-11-29',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Tyler Garcia',
        avatar: ''
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 16,
      title: 'Hire 5 new Fresher or Experienced, frontend and backend developers ',
      dueDate: '2020-12-12',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Darlene Shields',
        avatar: require('@src/assets/images/avatars/1.png').default
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 17,
      title: 'Plan a party for development team 🎁',
      dueDate: '2020-12-04',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Destiny Michael',
        avatar: ''
      },
      tags: ['medium', 'low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false
    },
    {
      id: 18,
      title: 'Fix Responsiveness for new structure 💻',
      dueDate: '2020-11-18',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      assignee: {
        fullName: 'Danielle Anderson',
        avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
      },
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true
    }
  ]
  export default tasks