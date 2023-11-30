import React from 'react'
import "./Home.css"
import Card from './Card'
import AddTaskModal from './AddTaskModal'

const Home = () => {
    const [tasks, setTasks] = React.useState([])
    const [taskType, setTaskType] = React.useState("All")
    const [displayModal, setDisplayModal] = React.useState(false)
    const [sortType, setSortType] = React.useState("Sort Tasks")
    const [menu, setMenu] = React.useState(false)
    React.useEffect(() => {
        filterAllTasks()
    }, [])
    React.useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = displayModal ? 'hidden' : 'auto';
    }, [displayModal])

    // filtering the tasks 
    const filterAllTasks = () => {
        setTaskType("All")
        if (localStorage.getItem("tasks") && localStorage.getItem("tasks").length > 0)
            setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
    const filterIncompleteTasks = () => {
        setTaskType("Incomplete")
        let allTasks = JSON.parse(localStorage.getItem("tasks"));
        setTasks(allTasks.filter(a => a.status === "Incomplete"))
    }
    const filterCompleteTasks = () => {
        setTaskType("Completed")
        let allTasks = JSON.parse(localStorage.getItem("tasks"));
        setTasks(allTasks.filter(a => a.status === "completed"))
    }

    // handling task operations 
    const handleTaskStatus = (index) => {
        let prevTasks = tasks;
        let task = prevTasks[index];
        task["status"] = "completed";
        prevTasks[index] = task;
        setTasks(prevTasks);
        localStorage.setItem("tasks", JSON.stringify(prevTasks));
    }
    const handleDelete = (index) => {
        let newTasks = tasks.filter((a) => a.id != index)
        setTasks(newTasks)
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
    const handleEdit = (index, data) => {
        let prevTasks = tasks;
        prevTasks[index] = data;
        localStorage.setItem("tasks", JSON.stringify(prevTasks));
        filterAllTasks()
    }
    //sorting the tasks
    const sortTasks = (type) => {
        setMenu(false)
        setSortType(type)
        sorting(type)
    }
    const sorting = (type) => {
        if (type === "Sort Tasks") {
            filterAllTasks()
            return
        }
        const sortedTasks = [...tasks].sort((a, b) => {
            let priorityOrder
            if (type === "Low to High") {
                priorityOrder = { Low: 0, Medium: 1, High: 2 };
            }
            else if (type === "High to Low") {
                priorityOrder = { Low: 2, Medium: 1, High: 0 };
            }
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        console.log(sortedTasks);
        setTasks(sortedTasks)
    }
    return (
        <div className='home'>
            <div className="headingBox">
                <div className='heading'>{taskType} Tasks ({tasks.length} {tasks.length > 1 ? "tasks" : "task"})</div>
                <button className='btn addBtn' onClick={() => { setDisplayModal(true) }}><span className='material-symbols-outlined'>add</span>New task</button>
            </div>
            <div className='btnGroups'>
                <div className='btns '>
                    <button onClick={filterAllTasks} className={`btn ${taskType === "All" ? "active" : ""}`}>All</button>
                    <button onClick={filterCompleteTasks} className={`btn ${taskType === "Completed" ? "active" : ""}`}>Completed</button>
                    <button onClick={filterIncompleteTasks} className={`btn ${taskType === "Incompleted" ? "active" : ""}`}>Incomplete</button>
                </div>
                <div className='btns'>
                    <div className='inputBox' tabIndex={"1"} onBlur={() => { setMenu(false) }}>
                        <div className='formInput select sort' onClick={() => setMenu(!menu)}>
                            {sortType} <span className='material-symbols-outlined'>expand_more</span>
                        </div>
                        <div className={`selectOptions ${menu ? "display" : ""}`}>
                            <div className="optionBox">
                                <div onClick={() => sortTasks("Sort Tasks")} className='options'>Reset Sort</div>
                                <div onClick={() => sortTasks("High to Low")} className='options'>High to Low</div>
                                <div onClick={() => sortTasks("Low to High")} className='options'>Low to High</div>
                            </div>
                        </div>
                    </div>
                    <button className='btn addBtn' onClick={() => { setDisplayModal(true) }}><span className='material-symbols-outlined'>add</span>New task</button>
                </div>
            </div>
            <div className='tasks'>
                {tasks?.map((task, index) => {
                    return <Card key={task.id} task={task} index={index} handleTaskStatus={handleTaskStatus} handleDelete={handleDelete} handleEdit={handleEdit} />
                })}
                <div className='card addCard' onClick={()=>{setDisplayModal(true)}}>Add New Task</div>
            </div>
            <div className={`modal ${displayModal ? "displayModal" : ""}`}>
                <AddTaskModal
                    tasks={tasks}
                    setTasks={setTasks}
                    setDisplayModal={setDisplayModal}
                />
            </div>
        </div>
    )
}

export default Home