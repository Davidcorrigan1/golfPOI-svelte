import axios from "axios";
import {courseCount, user} from "../stores.js"
export class GolfPOIService {
    courseList = [];
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        if (localStorage.donation) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.donation);
        }
    }

    async getCourseList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs")
            this.courseList = await response.data;
            return this.courseList;
        } catch (error) {
            return [];
        }
    }

    async getCoursesByCategory(categoryId) {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs/findByCategory/" + categoryId)
            this.courseList = await response.data;
            return this.courseList;
        } catch (error) {
            return [];
        }
    }

    async getCourse(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/golfPOIs/" + id)
            this.course = await response.data;
            return this.course;
        } catch (error) {
            return [];
        }
    }


    async createGolfPOI(newGolfPOI) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/golfPOIs`, newGolfPOI);
            return response.status == 201;
        } catch (error) {
            return false;
        }
    }

    async updateGolfPOI(courseId, userId, updatedGolfPOI) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/golfPOIs/update/` + courseId + "/" + userId, updatedGolfPOI);
            return response.status == 201;
        } catch (error) {
            return false;
        }
    }

    async getGolfPOIWeather(latitude, longitude) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/weatherAPI/` + latitude + "/" + longitude);
            this.course = await response.data;
            return this.course;
        } catch (error) {
            return false;
        }
    }

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

    async getCategoryList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/locationCategories")
            this.categoryList = await response.data;
            return this.categoryList;
        } catch (error) {
            return [];
        }
    }

    async createCategory(newCategory) {
        try {
            const response = await axios.post(this.baseUrl + "/api/locationCategories", newCategory)
            this.category = await response.data;
            return true;
        } catch (error) {
            return false;
        }
    }

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

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            if (response.data.success) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                localStorage.donation = JSON.stringify(response.data.token);
                return response.data;
            }
        } catch (error) {
            return false;
        }
    }

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
        localStorage.donation = null;
    }

    async signup(newUser) {
        try {
            const createdUser = await axios.post(`${this.baseUrl}/api/users/create`, newUser);
            if (createdUser) {
                const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email: newUser.email, password: newUser.password});
                if (response.data.success) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                    localStorage.donation = JSON.stringify(response.data.token);
                    user.set(createdUser.data);
                    return response.data;
                }
            }
            return false
        } catch (error) {
            return false;
        }
    }

    async updateUser(userId, updatedUser) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/update/` + userId , updatedUser);
            user.set(response.data);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async getUserByEmail(email) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/email/" + email)
            this.user = await response.data;
            return this.user;
        } catch (error) {
            return [];
        }
    }

    async getUserList() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users")
            this.userList = await response.data;
            return this.userList;
        } catch (error) {
            return [];
        }
    }

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
            console.log(userDetails);
            const response = await axios.post(`${this.baseUrl}/api/users/update/${id}`, userDetails);
            const newUser = await response.data;
            user.set(newUser);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getImageList(idList) {
        try {
            const response = await axios.get(this.baseUrl + "/api/imageAPI/" + idList)
            this.imageList = await response.data;
            return this.imageList;
        } catch (error) {
            return [];
        }
    }
}