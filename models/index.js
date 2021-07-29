const UserModel = require('./user');
const TaskModel = require('./task');
const ListModel = require('./list');

//Associations
UserModel.hasMany(ListModel, {
    as: 'lists',
    onDelete: 'CASCADE',
    foreignKey:'owner'
});
UserModel.hasMany(TaskModel, {
    foreignKey: 'owner'
});

ListModel.hasMany(TaskModel, {
    as: 'tasks',
    onDelete: 'CASCADE',
    foreignKey:'listId'
});

ListModel.belongsTo(UserModel);
TaskModel.belongsTo(ListModel);

module.exports ={
    UserModel,
    TaskModel,
    ListModel
};