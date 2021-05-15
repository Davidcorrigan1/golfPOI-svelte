import { writable } from "svelte/store";
export const courseCount = writable(0);
export const currentCourse = writable("");
export const currentCategoryId = writable("");

export const adminBar = [{
    title: "Add a course",
    icon: "fas fa-golf-ball fa-3x",
    colour: "color:rgb(200, 50, 74)",
    link: "/#/addCourse",
    count: "",
}, {
    title: "CourseReport",
    icon: "fas fa-th-list fa-3x",
    colour: "color:rgb(63, 122, 139)",
    link: "/#/courseReport",
    count: "",
}, {
    title: "AddCategory",
    icon: "fas fa-columns fa-3x",
    colour: "color:rgb(63, 122, 139)",
    link: "/#/addCategory",
    count: "",
}, {
    title: "Manage Users",
    icon: "fas fa-users fa-3x",
    colour: "color:rgb(14, 168, 160)",
    link: "/#/userReport",
    count: "",
}, {
    title: "Course Count",
    icon: "far fa-circle fa-stack-2x",
    colour: "color:rgb(63, 122, 139)",
    link: "/#/courseReport",
    count: "",
},{
    title: "Golf POI Map",
    icon: "fas fa-map-marked-alt fa-3x",
    colour: "color:rgb(102, 153, 255)",
    link: "/#/mapPOI",
    count: "",
},{
    title: "Settings",
    icon: "fas fa-sliders-h fa-3x",
    colour: "color:rgb(14, 168, 160)",
    link: "/#/settings",
    count: "",
}, {
    title: "Logout",
    icon: "fas fa-sign-out-alt fa-3x",
    colour: "color:rgb(163, 122, 139)",
    link: "/#/logout",
    count: "",
}];

export const mainBar = [{
    title: "Add a course",
    icon: "fas fa-golf-ball fa-3x",
    colour: "color:rgb(200, 50, 74)",
    link: "/#/addCourse",
    count: "",
}, {
    title: "CourseReport",
    icon: "fas fa-th-list fa-3x",
    colour: "color:rgb(63, 122, 139)",
    link: "/#/courseReport",
    count: "",
}, {
    title: "AddCategory",
    icon: "fas fa-columns fa-3x",
    colour: "color:rgb(63, 122, 139)",
    link: "/#/addCategory",
    count: "",
}, {
    title: "Golf POI Map",
    icon: "fas fa-map-marked-alt fa-3x",
    colour: "color:rgb(102, 153, 255)",
    link: "/#/mapPOI",
    count: "",
}, {
    title: "Settings",
    icon: "fas fa-sliders-h fa-3x",
    colour: "color:rgb(14, 168, 160)",
    link: "/#/settings",
    count: "",
}, {
    title: "Logout",
    icon: "fas fa-sign-out-alt fa-3x",
    colour: "color:rgb(163, 122, 139)",
    link: "/#/logout",
    count: "",
}];

export const welcomeBar = [
    {
        title: "Sign Up",
        icon: "fas fa-user-cog fa-3x",
        colour: "color:rgb(63, 160, 155)",
        link: "/#/signup",
        count: "",
    },
    {
        title: "Log In",
        icon: "fas fa-user-edit fa-3x",
        colour: "color:green",
        link: "/#/login",
        count: "",
    },
];

export const navBar = writable({
    bar: [],
});

export const title = writable("");
export const subTitle = writable("");
export const userToDelete = writable("");

export const user = writable({
    _id : "",
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    adminUser : false,
    loginCount : 0,
    lastLoginDate : "",
});