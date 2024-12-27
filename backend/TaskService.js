import Task from './TaskModel.js';

/** Add a new task */
export const addTask = async (taskData) => {
    try {
        const task = await Task.create(taskData);
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
};

/** Get all tasks */
export const getAllTasks = async () => {
    try {
        const tasks = await Task.findAll();
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
};

/** Find task by ID */
export const findTaskById = async (id) => {
    try {
        const task = await Task.findByPk(id);
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
};

/** Delete all tasks */
export const deleteAllTasks = async () => {
    try {
        const rowsDeleted = await Task.destroy({ where: {} });
        return rowsDeleted;
    } catch (error) {
        throw new Error(error.message);
    }
};

/** Delete a task by ID */
export const deleteTaskById = async (id) => {
    try {
        const rowsDeleted = await Task.destroy({ where: { id } });
        return rowsDeleted;
    } catch (error) {
        throw new Error(error.message);
    }
};
