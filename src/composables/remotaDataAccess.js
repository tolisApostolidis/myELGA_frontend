import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const applicationStorage = useApplicationStore();

export function remoteDataAccess(url, auth, method = ref("GET"), bodyRef = ref(null)) {
    const data = ref(null);
    const error = ref(false);
    const loading = ref(false);

    const performRequest = async() => {
        
        const headers = {
            'Content-Type': 'application/json',
        };

        if (auth.value === true) {
            headers['Authorization'] = 'Bearer ' + applicationStorage.userData.accessToken;
        }

        const configuration = {
            method: method.value,
            headers: headers,
            responseType: 'blob'
        };

        if (bodyRef.value !== null) {
            configuration.body = JSON.stringify(bodyRef.value);
        }

        loading.value = true;
        await fetch(url.value, configuration)
            .then((response) => {
                if (response.ok) {
                    error.value = false;
                    response.json().then((responseData) => {
                        data.value = responseData;   
                    })
                    .catch((e) => {
                        console.log("JSON parse error:", e);                
                    });
                }else {                                                
                    error.value = true;
                    console.log("Response bad!");

                    response.text().then((errorText) => {
                        console.log("Response bad!");
                        console.log("Status:", response.status);
                        console.log("Server response:", errorText);
                    }).catch((e) => {
                        console.log("Response bad! (could not read body)");
                        console.log("Status:", response.status);
                    });
                }
            })
            .catch((e) => {   
                console.log("Error in fetch => " + e);          
                error.value = true;             
            })
            .finally(() => {
                loading.value = false;
        });
    };
    return { data, error, loading, performRequest };
} 