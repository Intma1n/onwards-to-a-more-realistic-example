import React, {useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from "./components/hooks/use-http";

function App() {
    const [tasks, setTasks] = useState([]);

    const transformTasks = tasksObj => {
        const loadedTasks = [];

        for (const taskKey in tasksObj) {
            loadedTasks.push({id: taskKey, text: tasksObj[taskKey].text});
        }

        setTasks(loadedTasks);
    }

    const {isLoading, error, sendRequest: fetchTasks} = useHttp({
        url: 'https://react-http-5a3a2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
    }, transformTasks)

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler}/>
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
