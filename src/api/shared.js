import instance from ".";

// ============= GET =============
/**
 * Fetches profile details of the logged-in user (Employee or Admin).
 * @returns {Promise<Object>} User object.
 */
const getMyProfile = async () => {
  const response = await instance.get("/users/my-profile");
  return response.data;
};

export { getMyProfile };
