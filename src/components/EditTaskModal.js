import React from 'react'

const EditTaskModal = ({task,error,handleFormSubmit, setDisplayModal,setTask}) => {
    const [menu, setMenu] = React.useState(false)
   
    const onInputChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    
    return (
        <div className='modalBox addTaskModal'>
            <div className='modalHead'>
                <div className='heading'>Edit task</div>
                <div className='material-symbols-outlined' onClick={() => { setDisplayModal(false) }}>close</div>
            </div>
            <div className='modalError'>{error}</div>
            <div className='modalContainer'>
                <form className='modalForm' onSubmit={(handleFormSubmit)}>
                    <div className='inputBox'>
                        <label className='formLabel' htmlFor="title">Title</label>
                        <input className='formInput' value={task.title} onChange={onInputChange} name="title" id='title' type="text" />
                    </div>
                    <div className='inputBox'>
                        <label className='formLabel' htmlFor="descriptiom">Description (Optional)</label>
                        <textarea className='formInput' value={task.description} onChange={onInputChange} name='description' id='descriptiom' type="text" />
                    </div>
                    <div className='inputBox'>
                        <label className='formLabel' htmlFor="date">Due Date</label>
                        <input className='formInput' value={task.date} onChange={onInputChange} name='date' id='date' type="Date" />
                    </div>
                    <div className='inputBox' tabIndex={"1"} onBlur={() => { setMenu(false) }}>
                        <label className='formLabel' htmlFor="">Priority level</label>
                        <div className='formInput select' onClick={() => setMenu(!menu)}>
                            {task.priority} <span className='material-symbols-outlined'>expand_more</span>
                        </div>
                        <div className={`selectOptions ${menu ? "display" : ""}`}>
                            <div className="optionBox">
                                <div onClick={() => { setTask({ ...task, priority: "Low" }); setMenu(false) }} className='options'>Low</div>
                                <div onClick={() => { setTask({ ...task, priority: "Medium" }); setMenu(false) }} className='options'>Medium</div>
                                <div onClick={() => { setTask({ ...task, priority: "High" }); setMenu(false) }} className='options'>High</div>
                            </div>
                        </div>
                    </div>
                    <div className='inputBox btns'>
                        <button type='submit' className='btn addBtn'>Edit task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTaskModal