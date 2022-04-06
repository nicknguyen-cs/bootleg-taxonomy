const contentstack = require("contentstack");
const contentstackManagement = require('@contentstack/management');

const Stack = contentstack.Stack({
    api_key: process.env.REACT_APP_API_KEY,
    delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
    environment: process.env.REACT_APP_ENVIRONMENT,
    region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us",
});

const client = contentstackManagement.client()
client.login({ email: 'nick.nguyen@contentstack.com', password: 'tOby603803.' })
    .then(() => console.log('Logged in successfully'))

if (process.env.CUSTOM_HOST) {
    Stack.setHost(process.env.CUSTOM_HOST);
}



export default {
    getEntry(contentTypeUid, tag) {
        return new Promise((resolve, reject) => {
            console.log(contentTypeUid);
            const query = Stack.ContentType(contentTypeUid).Query();
            if (tag) {
                console.log("Tag" , tag.value);
                query.where("taxonomy.taxonomy", tag.value);
            }
            query
                .includeOwner()
                .toJSON()
                .find()
                .then(
                    (result) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    },
                );
        });
    },

    getContentTypes() {
        return new Promise((resolve, reject) => {
            const query = Stack.getContentTypes();
            query
                .then(
                    (result) => {
                        resolve(result.content_types);
                    },
                    (error) => {
                        reject(error);
                    },
                );
        });
    },

    getEntryByTag(tag) {
        
    }
}
