import React from 'react'
import EditTaskModal from './EditTaskModal'

const Card = ({ task, handleTaskStatus, index, handleDelete, handleEdit }) => {
    const [displayConfirmModal, setDisplayConfirmModal] = React.useState(true)
    const [displayEditModal, setDisplayModal] = React.useState(false)
    const [editTask, setEditTask] = React.useState(task)
    const [error, setError] = React.useState("")
    const displayModal = () => {
        setDisplayConfirmModal(!displayConfirmModal)
    }
    React.useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = displayEditModal ? 'hidden' : 'auto';
    }, [displayEditModal])
    const handleEditForm = (e) => {
        e.preventDefault()
        setError("")
        if (task?.title.length < 1) {
            setError("Please enter the task title")
            return
        }
        const currentDate = new Date();
        const enteredDate = new Date(editTask.date);

        if (enteredDate < currentDate) {
            setError('Due date must be in the future');
            return
        }
        if (task?.priority === "Select options") {
            setError("Please set the task Priority level")
            return
        }
        setDisplayModal(false)
        handleEdit(index, editTask)
    }
    return (
        <>
            {displayConfirmModal ? <div className={`card animationCard1`}>
                <div className='taskDetails'>
                    <div className='taskTitle'>{task.title}</div>
                    <div className='taskDesc'>{task.description}</div>
                    <div className='taskDueDate'><span className='material-symbols-outlined'>event</span>{task.date}</div>
                </div>
                <div className='taskFunc'>
                    {task?.status === "completed" ? <div className='taskCompleted taskStatus'><span className='text'>{task.status}</span><span className='material-symbols-outlined'>check</span></div> :
                        <div onClick={displayModal} className='taskIncomplete taskStatus'><span className="text"><input type="checkbox" disabled />Mark as completed</span><span className="material-symbols-outlined">close</span></div>}
                    <div className='functions'>
                        <div className='taskPriority'>{task.priority[0]}<span className='text'>{task.priority.slice(1)}</span></div>
                        <div onClick={() => handleDelete(task.id)} className="material-symbols-outlined">
                            delete
                        </div>
                        {task.status === "Incomplete" && <div onClick={() => { setDisplayModal(true) }} className="material-symbols-outlined">
                            edit
                        </div>}
                    </div>
                </div>
            </div> : <div className={`card confirmCard animationCard`}>
                <div className="taskDetails">
                    <div className='taskTitle'>Are You Sure?</div>
                    <div className='taskDesc'>This task is Completed.</div>
                </div>
                <div className='taskDueDate' style={{ opacity: "0" }}><span className='material-symbols-outlined'>event</span>{task.date}</div>
                <div className='taskFunc confirmFunc'>
                    <div onClick={displayModal} className='btn noBtn'>No</div>
                    <div onClick={() => { displayModal(); handleTaskStatus(index) }} className='btn yesBtn'>Yes</div>

                </div>
            </div>}
            <div className={`modal ${displayEditModal ? "displayModal" : ""}`}>
                <EditTaskModal
                    task={editTask}
                    setTask={setEditTask}
                    setDisplayModal={setDisplayModal}
                    handleFormSubmit={handleEditForm}
                    error={error}
                />
            </div>
        </>
    )
}

export default Card