import { emptyValue } from "./globalConstants";

export const isValidInput = (inputString: string | undefined) => {
    return !!inputString && inputString !== emptyValue;
}