const fetch = require("cross-fetch");
const fs = require("fs");
const path = require('path');

const getData = (url) => {
    return fetch(url)
        .then((res) => res.json())
}


const groupDataByUserId = (data) => {

    const newObj = data.reduce((result, curr) => {

        const { userId, id, title, completed } = curr


        if (result[userId]) {

            if (!completed) {

                result[userId].unshift({ id, title, completed })

            }
            else {

                result[userId].push({ id, title, completed })
            }
        }
        else {

            result[userId] = [{ id, title, completed }]
        }

        return result
    }, {})

    return newObj
}

const groupDataByTasks = (data) => {

    let dataByTask = data.reduce((result, curr) => {

        const { userId, id, title, completed } = curr

        if (!completed) {

            result['nonCompleted'].push({ userId, id, title })
        }

        else {

            result['completed'].push({ userId, id, title })
        }

        return result;

    }, { 'completed': [], 'nonCompleted': [] });


    return dataByTask
}

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, file), JSON.stringify(data), (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(`${file} file created.`)
            }
        })
    })
}

const solutions = async () => {

    const A = await getData("https://jsonplaceholder.typicode.com/todos")
    const C = groupDataByUserId(A)
    const D = groupDataByTasks(A)
    writeFile("solution.json", { A, C, D })

}

solutions()



