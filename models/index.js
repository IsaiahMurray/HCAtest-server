const User = require('./user');
const Task = require('./task');
const List = require('./list');

//Associations
User.hasMany(List, {
    as: 'lists',
    onDelete: 'CASCADE',
    foreignKey:'owner'
});
User.hasMany(Task, {
    foreignKey: 'owner'
});

List.hasMany(Task, {
    as: 'tasks',
    onDelete: 'CASCADE',
    foreignKey:'listId'
});

List.belongsTo(User);
Task.belongsTo(List);

module.exports ={
    User,
    Task,
    List
};