import { getBaseURL } from "./get-base-url";

export const getAbsoluteImageUrl = (path: string) => {
    return `${getBaseURL()}/${path}`;
}