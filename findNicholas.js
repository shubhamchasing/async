const fetch = require("cross-fetch");

const getData = (url) => {

    return fetch(url).then(res => res.json())
}

const getIdOfNicholas = (data) => {

    const userIdsData = data.reduce((result,curr) => {

        if(curr['name'].includes("Nicholas")){
            result.push(curr['id'])
        }

        return result
    },[])

    return userIdsData
}

getTodos = (todoData, userIdsData) => {

    const todo = todoData.reduce( (result,curr) => {

        if (userIdsData.includes(curr['userId'])){

            result.push({...curr})
        }
         
        return result
    },[])

    return todo
}

const nicholasTodos = async () => {

    const data = await getData('https://jsonplaceholder.typicode.com/users')
    const userIdsData = getIdOfNicholas(data)
    const todoData = await getData('https://jsonplaceholder.typicode.com/todos')
    const todo = getTodos(todoData,userIdsData)
    //console.log(todo)
 
} 

nicholasTodos()