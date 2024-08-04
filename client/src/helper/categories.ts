import { type category, PodcastCategories } from "../types/categories.types";

export const findCategories = (categoriesArray : string[]) : category | null => {
    if (categoriesArray.length > 0) {
        if (Array.isArray(categoriesArray[0]) && categoriesArray[0].length > 0) {
            let value : string = categoriesArray[0][0];
            if (categoriesArray[0].length === 2) {
                value = value + ' > ' + categoriesArray[0][1];
            }
            const category = PodcastCategories.find((item) => item.name === value);
            if (category)
                return category;
        }
    }
    return null;
}
