import axios from "axios";
import {courseCount, user} from "../Stores";
export class GolfPOIService {
    courseList = [];
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        if (localStorage.golfPOIToken) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.golfPOIToken);
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Returns an array of courses from the API call.
    //-----------------------------------------------------------------------------------------------------------
    async getCourseList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs")
            this.courseList = await response.data;
            return this.courseList;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Returns an array of courses for a categoryId from the API call.
    //-----------------------------------------------------------------------------------------------------------
    async getCoursesByCategory(categoryId) {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs/findByCategory/" + categoryId)
            this.courseList = await response.data;
            return this.courseList;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Returns a specific course based on id from the API call.
    //-----------------------------------------------------------------------------------------------------------
    async getCourse(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs/" + id)
            this.course = await response.data;
            return this.course;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Creates a new course POI on the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async createGolfPOI(newGolfPOI) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/golfPOIs`, newGolfPOI);
            return {success: true, response: response};
        } catch (error) {
            return {success: false, message: error.response.data.message};
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Updates an existing course POI on the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async updateGolfPOI(courseId, userId, updatedGolfPOI) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/golfPOIs/update/` + courseId + "/" + userId, updatedGolfPOI);
            return {success: true, response: response};
        } catch (error) {
            return {success: false, message: error.response.data.message};
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Retrieves the Weather for specific lat, long coordinates using the API.
    //-----------------------------------------------------------------------------------------------------------
    async getGolfPOIWeather(latitude, longitude) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/weatherAPI/` + latitude + "/" + longitude);
            this.course = await response.data;
            return this.course;
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Deletes an existing course POI based on id from the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async deleteGolfPOI(courseId) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/golfPOIs/" + courseId)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Retrieves the list of categories from the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async getCategoryList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/locationCategories")
            this.categoryList = await response.data;
            return this.categoryList;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Creates a new category on the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async createCategory(newCategory) {
        try {
            const response = await axios.post(this.baseUrl + "/api/locationCategories", newCategory)
            this.category = await response.data;
            return true;
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Deletes a category based on id from the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async deleteCategory(categoryId) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/locationCategories/" + categoryId)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Authenticates the user using the API. Then updates the headers on the axios calls with the token
    // retrieved. It also save it in local storage in the browser.
    //-----------------------------------------------------------------------------------------------------------
    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            if (response.data.success) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                localStorage.golfPOIToken = JSON.stringify(response.data.token);
                return response.data;
            }
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Logs the user out by resetting all the store variables.
    //-----------------------------------------------------------------------------------------------------------
    async logout() {
        user.set({
            _id : "",
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            adminUser : false,
            loginCount : 0,
            lastLoginDate : ""
        });
        courseCount.set(0);
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.golfPOIToken = null;
    }

    //-----------------------------------------------------------------------------------------------------------
    // Signs up a new user, by creating a new user and authenticating them using the API.
    //-----------------------------------------------------------------------------------------------------------
    async signup(newUser) {
        try {
            const createdUser = await axios.post(`${this.baseUrl}/api/users/create`, newUser);
            if (createdUser) {
                const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email: newUser.email, password: newUser.password});
                if (response.data.success) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                    localStorage.golfPOIToken = JSON.stringify(response.data.token);
                    user.set(createdUser.data);
                    return response.data;
                }
            }
            return false
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Updates an existing user on the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async updateUser(userId, updatedUser) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/update/` + userId , updatedUser);
            user.set(response.data);
            return response.data;
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Retrieves an existing user from the DB based on email using the API.
    //-----------------------------------------------------------------------------------------------------------
    async getUserByEmail(email) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/email/" + email)
            this.user = await response.data;
            return this.user;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Retrieves all users from the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async getUserList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users")
            this.userList = await response.data;
            return this.userList;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Delets an existing user based on id from the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async deleteUser(userId) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users/" + userId)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Updates an existing user on the DB using the API.
    //-----------------------------------------------------------------------------------------------------------
    async updateSettings(firstName, lastName, email, password, id, loginCount, lastLoginDate) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                _id: id,
                loginCount: loginCount,
                lastLoginDate: lastLoginDate
            };
            const response = await axios.post(`${this.baseUrl}/api/users/update/${id}`, userDetails);
            const newUser = await response.data;
            user.set(newUser);
            return {success: true};
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Retrieves a list of images with the passed array of public ids from Cloudinary using the API.
    //-----------------------------------------------------------------------------------------------------------
    async getImageList(idList) {
        try {
            const response = await axios.get(this.baseUrl + "/api/imageAPI/" + idList)
            this.imageList = await response.data;
            return this.imageList;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Upload a new image to Cloudinary and update it in the Course related images array using the API.
    //-----------------------------------------------------------------------------------------------------------
    async uploadImage(courseId, imagefile) {
        try {
            const response = await axios.post(this.baseUrl + "/api/golfPOIs/upload/" + courseId , {imagefile: imagefile})
            return response.data;
        } catch (error) {
            return [];
        }
    }

    //-----------------------------------------------------------------------------------------------------------
    // Delete an image from Cloudinary with public id and remove from Course array of images using the API.
    //-----------------------------------------------------------------------------------------------------------
    async deleteImage(imageId, courseId, userId) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/golfPOIs/deleteImage/" + imageId + "/" + courseId + "/" + userId)
            return response.data;
        } catch (error) {
            console.log("Failing here!")
            console.log(error)
            return [];
        }
    }
}