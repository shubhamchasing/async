const fs = require("fs");
const path = require("path");

const readFile = (file, callback) => {

    return new Promise((resolve, reject) => {
        
        fs.readFile(path.join(__dirname,file), (err, data) => {
            if (err) {
                reject(err)
            }
             else {
                let obj = callback(JSON.parse(data))
                resolve(obj)
            }
        })
    })
}

const transform = (obj) => {
    return (Object.keys(obj).map(item => obj[item]))
}

const operations = async () => {

    try {

        const result = await readFile("solution.json", transform)
        console.log(result)
    } 
    catch (err) {

            console.log("Missing File.")    
    }
}

operations();
