import axios from 'axios';

export function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs",)
        return dispatch({
            type: "GET_BREEDS",
            payload: json.data
        })
    }
}

export function getBreedsDetail(id) {
    return async function (dispatch) {
        var Breed = await axios.get(`http://localhost:3001/dogs/` + id)

        return dispatch({
            type: "GET_BREEDS_DETAIL",
            payload: Breed.data
        })

    }
}
export function getBreedName(razaName) {
    return async function (dispatch) {
        try {
            var Raza = await axios.get(`http://localhost:3001/dogs?name=` + razaName)
            return dispatch({
                type: "GET_BREED_NAME",
                payload: Raza.data   
            })
        } catch (error) {
            return dispatch({
                type: "ERROR",
                payload: "No se encontro el nombre!!"
            })
        }
    }
}
export function getTemperaments() {
    return async function (dispatch) {
        var temper = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: temper.data
        })
    }
}
export function postTemperament(payload) {
    return async function (dispatch) {
        try {
            const dog = { "name": payload.name, "height": `${payload.heightMin} - ${payload.heightMax}`, "weight": `${payload.weightMin} - ${payload.weightMax}`, "lifeSpan": payload.lifeSpan, "temperament": payload.temperament }
            const post = await axios.post("http://localhost:3001/dog", dog)
            alert  ("personaje creado")
            return post

        } catch (error) {
            alert  ("falta completar campos")

        }

    }
}



export function filterTemperament(payload) {
    return {
        type: "FILTER_TEMPERAMENT",
        payload

    }
}

export function filterCreated(payload) {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs?filterBy=" + payload)
       
        return dispatch({
            type: "FILTER_CREATED",
            payload: json.data
        })
    }
}
export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderPesado(payload) {
    return {
        type: "ORDER_PESADO",
        payload
    }
}

export function removeBreedsDetails() {
    return {
        type: "REMOVE_BREEDS_DETAILS"
    }
}







