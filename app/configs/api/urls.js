import { GET, POST, DELETE,  } from "~/configs/api/methods";

// ============ AUTH ============
export const LOGIN_ACCESS_TOKEN = {
  method: POST,
  path: "auth/access-token",
};

export const REFRESH_TOKEN = {
  method: POST,
  path: "auth/refresh-token",
};

export const REGISTER = {
  method: POST,
  path: "auth/register",
};

// ============ USERS ============
export const GET_CURRENT_USER = {
  method: GET,
  path: "users/me",
};

export const DELETE_CURRENT_USER = {
  method: DELETE,
  path: "users/me",
};

export const RESET_PASSWORD = {
  method: POST,
  path: "users/reset-password",
};

// ============ TESTS ============
export const GET_MODULE_TEST = ({ module_id }) => {
  return {
    method: GET,
    path: `tests/module/${module_id}`,
  };
};

export const CHECK_SINGLE_ANSWER = ({ test_id }) => {
  return {
    method: POST,
    path: `tests/${test_id}/answer`,
  };
};

export const SUBMIT_TEST = ({ test_id }) => {
  return {
    method: POST,
    path: `tests/${test_id}/submit`,
  };
};

export const GET_MODULE_TEST_STATUS = ({ module_id }) => {
  return {
    method: GET,
    path: `tests/module/${module_id}/status`,
  };
};

// ============ COURSES ============
export const GET_COURSES = {
  method: GET,
  path: "courses",
};

export const GET_COURSE = ({ course_id }) => {
  return {
    method: GET,
    path: `courses/${course_id}`,
  };
};

// ============ MODULES ============
export const GET_COURSE_MODULES = ({ course_id }) => {
  return {
    method: GET,
    path: `modules/courses/${course_id}`,
  };
};

export const GET_MODULE = ({ module_id }) => {
  return {
    method: GET,
    path: `modules/${module_id}`,
  };
};