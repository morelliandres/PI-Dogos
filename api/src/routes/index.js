const { Router } = require('express');
const axios = require('axios');


const { Dog, Temperament } = require('../db');

var cors = require("cors")



const router = Router();
router.use(cors());



const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await Promise.all(
        apiUrl.data.map(el => { 
            return {
                id: el.id,
                name: el.name,
                height: el.height,
                weight: el.weight,
                lifeSpan: el.life_span,
                temperament: el.temperament,
                image: el.image
            };
        })
    )
    return apiInfo;
}

const getDbInfo = async () => {
    const dogsDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return dogsDb;
}

const getAllDog = async () => {
    let apiInfo = await getApiInfo();
    let dogsDbData = await getDbInfo();
    let totalInfo = apiInfo.concat(dogsDbData); 
    return totalInfo;
}

router.get('/dogs', async (req, res) => {
    const { name, filterBy } = req.query 
    let totalBreed = await getAllDog();
    
    if (name) {
        let dogArray = []
        
        totalBreed.forEach(el => { 
            console.log(typeof el)
            if (el && el.name) {
                if (el.name.toLowerCase().includes(name.toLowerCase())) {
                    dogArray.push(el)
                }
            }
        })          
        dogArray.length ?  
            res.status(200).send(dogArray) :
            res.status(404).send("Breeds does not exit!!");
    } else if (filterBy === "api") { 
        const apiDogs = await getApiInfo()
        res.status(200).send(apiDogs)
    } else if (filterBy === "db") {
        const dbDogs = await getDbInfo()
        res.status(200).send(dbDogs)
    }
    else {
        res.status(200).send(totalBreed)
    }
})

router.get('/temperament', async (req, res) => {
    try {
        const tempApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const tempData = await Temperament.findAll();
        console.log(tempData);
        if (tempData.length) {
          res.send(tempData)
        }
        else {
            var arr = [];
            const temperamentArray = []
            tempApi.data.forEach(e => {
                if (e.temperament) {
                    var tempArray = e.temperament.split(',')
                    temperamentArray.push(tempArray)
                }
            });
            const ordTemp = temperamentArray.flat();
            var temperamentsFilterd = [...new Set(ordTemp)];
            var temperamentsForSave = temperamentsFilterd.map(e => ({ name: e }));
            await Temperament.bulkCreate(temperamentsForSave, { returning: true });
            res.status(200).send("se guardo")
        }
    } catch (error) {
        console.log(error);
    };
});

router.get("/dogs/:idRaza", async (req, res) => {
    try {
        const { idRaza } = req.params;
        const razaTotal = await getAllDog()
        if (idRaza) {
         let razaId = razaTotal.filter(el => {
                if (el) {
                    return el.id == idRaza
                } else {
                    return false
                }
            })
            res.status(200).json(razaId)
        }
    } catch (error) {
        res.status(404).send("no hay breeds!!!")
    }
});
router.post("/dog", async (req, res) => {
    let { name, height, weight, lifeSpan, temperament } = req.body;
    if (!name || !height || !weight ) {
        res.status(400).send("faltan datos")
        return 
    }
    try {
        let dogCreate = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
            temperament,
           
        })
        let dogDbs = await Temperament.findAll({
            where: { name: temperament }
        })
        dogCreate.addTemperament(dogDbs);
        res.send("personaje creado con exito!!! ")
    } catch (error) {
        res.status(400).send("rellenar campo obligatorio")
    }
})

module.exports = router;
