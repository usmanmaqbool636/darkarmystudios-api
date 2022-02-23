// ** Navigation imports
import apps from './apps'
import dashboards from './dashboards'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import uiElements from './ui-elements'

// ** Merge & Export

// Menues [new]
export default [
    ...dashboards, 
    ...apps
    // ...pages, 
    // ...uiElements, 
    // ...forms, 
    // ...tables, 
    // ...charts, 
    // ...others
]


// Menues [old]
// export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others]
