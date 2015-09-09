var _ = require("lodash");

var roles = {
    "admin" : {
        roleLevel: 999
    },
    "editor" : {
        roleLevel: 2
    },
    "user" : {
        roleLevel: 1
    }
};

var permissions = {
    CAN_CREATE : 2,
    CAN_UPDATE : 2,
    CAN_REMOVE : 3
};

module.exports = {
    getRolesArray : function () {
        return _.keys(roles);
    },
    isEditor: function (user) {
        return user && user.role == roles["EDITOR"];
    },
    isAdmin: function (user) {
        return user && user.role == roles["ADMIN"];
    },
    canCreate: function (user) {
        return user && roles[user.role].roleLevel > permissions["CAN_CREATE"];
    },
    canUpdate: function (user) {
        return user && roles[user.role].roleLevel > permissions["CAN_UPDATE"];
    },
    canRemove: function (user) {
        return user && roles[user.role].roleLevel > permissions["CAN_REMOVE"];
    },
    canEdit: function (user) {
        return this.canCreate(user) && this.canUpdate(user);
    },
    canSuperEdit: function (user) {
        return this.canEdit(user) && this.canRemove(user);
    }
};