export const AUTH_PATH = {
    register: "Auth/Register",
    login: "Auth/Login",
    logout: "Auth/Logout",
    refreshToken: "Auth/RefreshToken",
    confirmemail: "Auth/ConfirmEmail"
}

export const SERVICE_PATH = {
    getAll: "Service/GetAll"
}

export const COLLABORATOR_PATH = {
    add: "Collaborator/Add",
    update: "Collaborator/Update",
    getProfile: "Collaborator/GetProfile?collaboratorId=",
    getAll: "Collaborator/GetAll?type=",
    changeStatus: "Collaborator/ChangeStatus"
}

export const HOME_PATH = {
    getAll: "Home/GetAll"
}

export const MANAGE_COLLABORATOR_PATH = {
    getAll: "ManageCollaborator/GetAll"
}