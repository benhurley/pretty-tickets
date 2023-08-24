import { emptyValue } from "./globalConstants";

export const isValidInput = (inputString: string | null | undefined) => {
    return !!inputString && inputString !== emptyValue;
}