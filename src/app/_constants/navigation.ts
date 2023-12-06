const DASHBOARD_PATH = "/dashboard";

export enum NAVIGATION_PATHS {
  LOGIN = "/login",
  LANDING_PAGE = "/",
  DASHBOARD_HOME = `${DASHBOARD_PATH}/home`,
  DASHBOARD_COURSES = `${DASHBOARD_PATH}/courses`,
  NOT_YET_IMPLEMENTED = `${DASHBOARD_PATH}/*`, // TODO: Deprecate
}
