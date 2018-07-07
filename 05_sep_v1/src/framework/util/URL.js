export default class URL {
    constructor(url) {
        if (!url) {
            throw new Error("URL入参[url]不能为空，请检查!");
        }

        this.url = url;
    }

    addPara(key, value) {
        let url = this.url;

        if (url.indexOf("?") != -1) {
            url += "&" + key + "=" + encodeURIComponent(value);
        } else {
            url += "?" + key + "=" + encodeURIComponent(value);
        }

        this.url = url;
    }

    addForm(formValues) {
        for(const key in formValues){
            this.addPara(key, formValues[key]);
        }
    }

    getURLString() {
        return this.url;
    }
}

