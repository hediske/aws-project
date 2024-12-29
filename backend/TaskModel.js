import { sequelize } from "./DBconfig.js";
import { DataTypes } from 'sequelize';


const Task = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Startdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Enddate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});
Task.sync()
export default Task;
