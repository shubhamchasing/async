const fetch = require('cross-fetch');


const apiCallAll = (...arg) => {

    return Promise.all(arg.map((user) => {
        const url = "https://jsonplaceholder.typicode.com/users/" + user

        return fetch(url).then((res) => res.json())
    })).catch((err) => {
        console.log(err)
    })

}

//apiCallAll(1,2,3,4).then(res => console.log(res))

const oneApiCall = (...arg) =>{

    const url = arg.reduce((result,curr,index) =>{

        if(index === 0) {
            result += curr
        }
        else{
        result += "&id=" + curr
        }
        return result 

    }, "https://jsonplaceholder.typicode.com/users?id=")

     return fetch(url).then((res) => res.json()).catch((err) => console.log(err))
}



//oneApiCall(1,2).then(res => console.log(res))