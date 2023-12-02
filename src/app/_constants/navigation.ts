const DASHBOARD_PATH = "/dashboard"

export enum NAVIGATION_PATHS {
    LOGIN = "/login",
    LANDING_PAGE = "/",
    DASHBOARD_HOME = `${DASHBOARD_PATH}/home`,
    DASHBOARD_MEETINGS = `${DASHBOARD_PATH}/meetings`,
    START_CALL = `${DASHBOARD_PATH}/meetings/start`,
    JOIN_CALL = `${DASHBOARD_PATH}/meetings/join`,
}