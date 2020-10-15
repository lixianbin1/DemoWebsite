import {combineReducers} from 'redux'


const name=(state='张三',action)=>{
    switch(action.type){
        case 'setName':
        return action.data
        default:
        return state
    }
}
const year=(state=1,action)=>{
    switch(action.type){
        case 'setYear':
        return action.data
        default:
        return state
    }
}
const nameApp=combineReducers({
    name,
    year
})

export default nameApp