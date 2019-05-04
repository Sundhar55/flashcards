//middleware/logger.js


const logger = (store) => (next) => (action) =>{
    console.group("action type is ", action.type)
        console.log('the action :' , action)
        const returnValue = next(action)
        console.log('--------return value for action is -----------', returnValue)
        console.log('the new state is :', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger