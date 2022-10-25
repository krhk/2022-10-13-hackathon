import {XMLParser} from "fast-xml-parser";

export async function fetcher(url) {
    const parser = new XMLParser();
    const res = await fetch(url);
    const xml = await res.text();
    console.log(xml)
    const obj = parser.parse(xml);
    console.log(obj);
    return obj;
}

export function getCategories(data) {
    var categories = [];
    data.rss.channel.item.map((item, i) => {
        if(Array.isArray(item.category)) {
            const itemCategories = item.category;
            itemCategories.map((category, i) => {
                if(!categories.includes(category)) {
                    categories.push(category);
                }
            })
        }
        else {
            const itemCategory = item.category;
            if(!categories.includes(itemCategory)) {
                categories.push(itemCategory);
            }
        }
    });

    return categories;
}

export function getChecked() {
    
}

export function filterData(data, search, categories) {
    var filtered = data.filter(nameFilter, this);

    return filtered;
}

function nameFilter(currentValue, index, arr) {
    if(this.search === "") {
        return true;
    }
    else {
        if(currentValue.includes(this.search)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function categoryFilter(currentValue, index, arr) {
    if(this.categories.isEmpty()) {
        return true;
    }
    else {
        if(currentValue.category.includes()) {
            return true;
        }
        else {
            return false;
        }
    }
}