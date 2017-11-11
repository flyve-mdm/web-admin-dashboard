import GetMode from '../Utils/GetMode'
import InitialListItem from './InitialListItem'

const INITIAL_STATE = {
    splitViewId: 'rootSplitView',
    paneOpened: false,
    mode: GetMode(),
    location: ['Dashboard'],
    splitViewConfigs: {
        small: {
            closedDisplayMode: 'none',
            openedDisplayMode: 'overlay'
        },
        medium: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'overlay'
        },
        large: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'inline'
        }
    },
    listItem: InitialListItem()
}

// Constants
const HANDLE_TOGGLE_PANE = 'flyve-mdm-web-ui/AdminDashboard/handleTogglePane'
const CLOSE_PANE = 'flyve-mdm-web-ui/AdminDashboard/closePane'
const CHANGE_MODE = 'flyve-mdm-web-ui/AdminDashboard/changeMode'
const CHANGE_LOCATION = 'flyve-mdm-web-ui/AdminDashboard/changeLocation'
const HANDLE_BACK = 'flyve-mdm-web-ui/AdminDashboard/handleBack'
const CHANGE_LIST_ITEM = 'flyve-mdm-web-ui/AdminDashboard/changeListItem'

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_TOGGLE_PANE:
            return {
               ...state,
               paneOpened: !state.paneOpened
            }

        case CLOSE_PANE:
            return {
               ...state,
               paneOpened: false
            }
        
        case CHANGE_MODE:
            return {
               ...state,
               mode: action.nexMode
            }
        
        case CHANGE_LOCATION:
            return {
               ...state,
               location: action.newLocation
            }

        case HANDLE_BACK:
            return {
               ...state,
               location: [...state.location.slice(0, 1)]
            }
        
        case CHANGE_LIST_ITEM:
            return {
                ...state,
                listItem: action.newListItem
            }

        default: return state
    }
}

// Action Creators
export function handleTogglePane () {
  return { 
      type: HANDLE_TOGGLE_PANE
    }
}
export function closePane () {
  return { 
      type: CLOSE_PANE
    }
}
export function changeMode (nexMode) {
  return { 
      type: CHANGE_MODE,
      nexMode
    }
}
export function changeLocation (newLocation) {
  return { 
      type: CHANGE_LOCATION,
      newLocation
    }
}
export function handleBack () {
  return { 
      type: HANDLE_BACK
    }
}
export function changeListItem(newListItem) {
    return {
        type: CHANGE_LIST_ITEM,
        newListItem
    }
}
