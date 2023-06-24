import { TOKEN } from "./Constants";

export const isUserLoggedIn = () => {
    const token = localStorage.getItem(TOKEN)

    return token != undefined;
}