export const AUTH_PATH = {
    register: "Auth/Register",
    login: "Auth/Login",
    logout: "Auth/Logout",
    refreshToken: "Auth/RefreshToken",
    confirmEmail: "Auth/ConfirmEmail",
    resetPassword: "Auth/ResetPassword",
    forgotPassword: "Auth/ForgotPassword",
    changePassword: "Auth/ChangePassword"
}

export const SERVICE_PATH = {
    getAll: "Service/GetAll"
}

export const COLLABORATOR_PATH = {
    add: "Collaborator/Add",
    update: "Collaborator/Update",
    getProfile: "Collaborator/GetProfile?collaboratorId=",
    getProfileByEmail: "Collaborator/GetProfileByEmail?email=",
    getAll: "Collaborator/GetAll?type=",
    changeStatus: "Collaborator/ChangeStatus",
    getAllFilter: "Collaborator/GetAllFilter?"
}

export const HOME_PATH = {
    getAll: "Home/GetAll",
    createOrder: "Home/CreateOrder"
}

export const MANAGE_COLLABORATOR_PATH = {
    getAll: "ManageCollaborator/GetAll"
}

export const CUSTOMER_PATH = {
    addReview: "Customer/AddReview",
}

export const JOBS_PATH = {
    getAll: "Jobs/GetAll",
    createJob: "Jobs/CreateJob",
}

export const ORDER_PATH = {
    getOrders: "Order/GetOrders?collaboratorId=",
    confirmOrder: "Order/ConfirmOrder?",
    createOrder: "Order/CreateOrder"
}