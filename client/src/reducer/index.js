

const initialState = {
    breeds: [],
    breedsDetails: [],
    temperament: [],
    filterBreed: [],
    filterPeso : [],
    error : "",

}


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_BREEDS":

            return {
                ...state,
                breeds: action.payload,
            }
        case "GET_BREEDS_DETAIL":
              return {
                ...state,
                breedsDetails: [action.payload[0]]
            }

        case "GET_BREED_NAME":
            return {
                ...state,
                breeds: action.payload,
                error : ""
            }

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "POST_TEMPERAMENT":
            return {
                ...state,
                temperament: action.payload
            }
        case "GET_TEMPERAMENTOS":
            return {
                ...state,
            }

        case "FILTER_TEMPERAMENT":
            const allBreeds = state.breeds
            const tempFilter = action.payload === "all" ? [] : allBreeds.filter(breed => breed?.temperament?.includes(action.payload))
            return {

                ...state,
                filterBreed: tempFilter
            }

        case "FILTER_CREATED":
            const breeds = action.payload

            return {
                ...state,
                breeds
            }
        case "ORDER_BY_NAME":
            if (!state.filterBreed.length) {
                let sortArr = action.payload === "asc" ? state.breeds.sort(function (a, b) {
                    if (a && b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1
                        }
                        return 0
                    }
                }) : state.breeds.sort(function (a, b) {
                    if (a && b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0
                    }
                })
                return {
                    ...state,
                    breeds: sortArr
 }
            } 
                
            

        case "ORDER_PESADO":
            if (!state.filterBreed.length) {
                let sortArr = action.payload === "weight" ? state.breeds.sort(function (a, b) {
                    
                    
                        const pesoA = a.weight.metric || a.weight 
                        const [primeroA, segundoA] = pesoA.split(" - ") || [pesoA]
                        const pesoB = b.weight.metric  || b.weight
                        const [primeroB, segundoB] = pesoB.split(" - ") || [pesoB ]
                        return parseInt(primeroB) - parseInt(primeroA)

                   
                }) : state.breeds.sort(function (a, b) {
                    
                        const pesoA = a.weight.metric || a.weight 
                        const [primeroA, segundoA] = pesoA.split(" - ") || [pesoA]
                        const pesoB = b.weight.metric  || b.weight
                        const [primeroB, segundoB] = pesoB.split(" - ") || [pesoB]
                        return parseInt(primeroA) - parseInt(primeroB)
                        
                })
                return {
                    ...state,
                    breeds: sortArr

                }
            } 
            case "REMOVE_BREEDS_DETAILS" : 
            return {
                ...state , 
                breedsDetails : []
            }
            case "ERROR" : 
            return{
                ...state,
                error : action.payload
            }
        default:
            return state
    }

}
export default rootReducer; 