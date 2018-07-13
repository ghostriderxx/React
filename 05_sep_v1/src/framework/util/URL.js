export default class URL {
    constructor(url) {
        if (!url) {
            throw new Error("URL入参[url]不能为空，请检查!");
        }

        this.url = url;
        this.multipartFormData = {};
        this.urlencodedFormData = {};
    }

    addPara(key, value) {
        if(value && value.file){
            this.multipartFormData = {
                ...this.multipartFormData,
                [key]: value,
            }
        }else{
            this.urlencodedFormData = {
                ...this.urlencodedFormData,
                [key]: value,
            }
        }
    }

    addForm(formValues) {
        for(const key in formValues){
            this.addPara(key, formValues[key]);
        }
    }

    ////////////////////////////////////////////////////////////////////

    hasMultipartFormData(){
        for(const pair in this.multipartFormData) {
            return true;
        }
        return false;
    }

    getUrl(){
        return this.url;
    }

    getData(){
        if(this.hasMultipartFormData()){
            const result = new FormData();

            // append multipartdata
            Object.keys(this.multipartFormData).forEach((key) => {
                result.append(key, this.multipartFormData[key].file);
            });

            // append urlencodedFormData
            Object.keys(this.urlencodedFormData).forEach((key) => {
                result.append(key, this.urlencodedFormData[key]);
            });

            return result;
        }else{
            const result = Object.keys(this.urlencodedFormData).map((key) => {
                return `${key}=${this.urlencodedFormData[key]}`;
            }).join('&');

            return result;
        }
    }
}

