import { useState } from "react"

export function CreateTodo(){
    // react query
    const [titlestate , setTitle] = useState("")
    const [descriptionstate , setDescription] = useState("")

    return <div>
        <input style={{
            margin : 10,
            padding : 10
        }} type="text" placeholder="Title" onChange={function(lulu){
                const valuett = lulu.target.value
                setTitle(lulu.target.value)
        }} /> <br />
        <input style={{
            margin : 10,
            padding : 10 
        }} type="text" placeholder="Description" onChange={function(lulu){
            const newvalue = lulu.target.value
            setDescription(lulu.target.value)
        }} /> <br />

        <button style={{
            margin : 10,
            padding : 10
        }} onClick={()=>{
            fetch("http://localhost:3000/create",{
                method : "POST",
                body: JSON.stringify({
                    title : titlestate,
                    description : descriptionstate
                }),
                headers : {
                    "Content-Type": "application/json"
                }
            })
                .then(async function(data){
                    const json = await data.json()
                    alert("Todo added")
                })
            
        }}>Add a Todo</button>
    </div>
}
