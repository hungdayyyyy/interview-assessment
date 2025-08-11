import http from "../index";
import { apiGetUserById, apiUpdateProfile } from "./urls";

/**
 * Get user by ID
 */
const getUserById = (id) => http.get(apiGetUserById(id));

/**
 * Update user profile
 */
const updateProfile = (id, body) => {
  return http.put(apiUpdateProfile(id), body);
};

const UserService = {
  getUserById,
  updateProfile,
};

export default UserService;
