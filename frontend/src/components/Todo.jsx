export function Todos({todos}){
    return <div>
        {todos.map(function(hulu){
            return <div>
            <h1>{hulu.title}</h1>
            <h2>{hulu.description}</h2>
            <button>{hulu.completed == true ? "Completed" : "Mark as completed"}</button>
            </div>
        })}
    </div>
}