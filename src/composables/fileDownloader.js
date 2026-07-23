import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const applicationStorage = useApplicationStore();

export function fileDownloader(type = ref(null), id = ref(null)) {
    const error = ref(null);

    const url = ref(null);
    if (type.value == 'submission') {
        url.value = '/services/farmer/' + id.value + '/download';
    }else {
        url.value = '/services/breeder/' + id.value + '/download';
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + applicationStorage.userData.accessToken
    };
    const configuration = {
        method: 'GET',
        headers: headers,
    };
    fetch(url.value, configuration)
    .then((response) => {
        if (response.ok) {
            response.json().then((responseData) => {
                var decodedBlob = base64ToArrayBuffer(responseData.body);
                downloadFile("Αίτηση", decodedBlob);
                
                error.value = false;
            });
        }
    })
    .catch((err) => {
        console.log("Error in fetch => " + err);
        error.value = true;
    });

    const downloadFile = (fileName, byteArr) => {
        var blob = new Blob([byteArr], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }

    const base64ToArrayBuffer = (fileData) => {
        var binaryString = window.atob(fileData);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    return error;
}
