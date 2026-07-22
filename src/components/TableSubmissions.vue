<script setup>
import { ref, onMounted, computed } from 'vue';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import { fileDownloader } from '@/composables/fileDownloader.js';
import TableHeader from '@/components/TableHeader.vue';
import logo from '@/assets/images/download-24.png';
import viewLogo from '@/assets/images/view-application.png';
import { useRoute, useRouter } from 'vue-router';
import cancelLogo from '@/assets/images/cancel.png';
import { BDropdown, BDropdownHeader, BDropdownItemButton, BDropdownDivider } from 'bootstrap-vue-next';
import { BModal } from 'bootstrap-vue-next';
import { useApplicationStore } from '@/stores/application';


const applicationStore = useApplicationStore();

const props = defineProps(['userRole']);
const route = useRoute();
const router = useRouter();

//// For sorting table ////
const sortByOption = ref('Newer');
const onSortOption = (value) => {
    sortByOption.value = value;
}

const sortByOptionGreek = computed(() => {
    switch (sortByOption.value) {
        case 'Newer':
            return 'Νεότερες';
        case 'NewerReverse':
            return 'Παλαιότερες';
        case 'AcceptedFirst':
            return 'Εγκεκριμένες Πρώτα';
        case 'CreatedFirst':
            return 'Υπό Επεξεργασία Πρώτα';
        default:
            return '';
    }
});

const onSortBy = computed(() => {
    const arr = (data.value ?? []).slice();

    const dateDesc = (a, b) => new Date(b.creationDate) - new Date(a.creationDate);
    const dateAsc  = (a, b) => new Date(a.creationDate) - new Date(b.creationDate);

    const orderByState = (order) => (a, b) => {
        const aRank = order.indexOf(a.state);
        const bRank = order.indexOf(b.state);
        return aRank - bRank;
    };

    switch (sortByOption.value) {
        case "Newer":
            return arr.sort(dateDesc);

        case "NewerReverse":
            return arr.sort(dateAsc);

        case "AcceptedFirst":
            return arr.sort(orderByState(["ACCEPTED", "CREATED", "REJECTED"]));

        case "CreatedFirst":
            return arr.sort(orderByState(["CREATED", "ACCEPTED", "REJECTED"]));

        default:
            return arr;
    }
});

//// For Modal
const applicationIdForDelete = ref(null);
const openModalState = ref(false);
const openModal = (value) => {
    applicationIdForDelete.value = value;
    openModalState.value = true;
}
const onModalDelete = async() => {
    console.log("came on delete");

    const url = ref('http://localhost:8080/services/farmer/' + applicationIdForDelete.value);
    const auth = ref(true);
    const deleteMethod = ref('DELETE');
    const { error, performRequest } = remoteDataAccess(url, auth, deleteMethod);
    await performRequest();
    if (error.value == true) {
        alert("Αδυναμία διαγραφής αίτησης με αναγνωριστικό: " + applicationIdForDelete.value);
    }else {
        router.go(router.currentRoute);
    }
}

const onDownload = (value) => {
    const id = ref(value);
    const type = ref('submission');

    fileDownloader(type, id);
}

const farmerId = ref(null);
const auth = ref(true);
const url = ref(null);
const { loading, data, performRequest } = remoteDataAccess(url, auth);

const currentRole = ref(null);

onMounted(() => {
    currentRole.value = applicationStore.userData.roles;

    if (props.userRole == 'ROLE_CITIZEN') {
        // Get farmer id from url
        farmerId.value = route.params.id;   

        url.value = 'http://localhost:8080/services/profile/' + farmerId.value + '/my-submissions';
    }else if(props.userRole == 'ROLE_MANAGER') {
        url.value = 'http://localhost:8080/services/manager/submissions';
    }
    performRequest();
});
</script>

<template>
    <b-modal v-model="openModalState" id="modal" no-close-on-backdrop="true" no-close-on-esc="true" centered hide-header hide-footer @ok="onModalDelete()">
        <div class="my-modal-header">
            <h3 class="my-modal-title">Επιβεβαίωση διαγραφής</h3>
            <button class="my-modal-close-btn" @click="openModalState = false"><img :src="cancelLogo" /></button>
        </div>

        <div class="my-modal-body">
            <p>Είστε σίγουροι πως θέλετε να διαγράψετε την αίτηση με αναγνωριστικό: <strong>{{ applicationIdForDelete }}</strong>;</p>
            <p class="my-modal-body-warning"><i>Εάν προχωρήσετε στην διαγραφή, η αίτηση σας δεν θα μπορεί να ανακτηθεί.</i></p>
        </div>   
        
        <div class="my-modal-footer">
            <button class="my-modal-btn-cancel" @click="openModalState = false">Ακύρωση</button>

            <button class="my-modal-btn-delete" @click="onModalDelete();">Διαγραφή</button>
        </div>
    </b-modal>
    
    <div v-if="loading" class="row">
        <div  class="spinner-border mx-auto" role="status" >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>    

    <div class="table-title-container">
        <h2 class="table-title">Αιτήσεις καλλιέργειας</h2>

        <div class="table-sort-container">
            <b-dropdown size="lg" dropend="" :text="'Ταξινόμηση: ' + sortByOptionGreek" variant="none" class="m-2" toggleClass="btn-dropdown-order" noCaret="">
                <b-dropdown-header>Ημερομηνία δημιουργίας</b-dropdown-header>
                <b-dropdown-item-button @click="onSortOption('Newer')">Νεότερες</b-dropdown-item-button>
                <b-dropdown-item-button @click="onSortOption('NewerReverse')">Παλαιότερες</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-header>Κατάσταση</b-dropdown-header>
                <b-dropdown-item-button @click="onSortOption('AcceptedFirst')">Εγκεκριμμένες Πρώτα</b-dropdown-item-button>
                <b-dropdown-item-button @click="onSortOption('CreatedFirst')">Υπο-επεξεργασία Πρώτα</b-dropdown-item-button>
            </b-dropdown>
        </div>
    </div>

    <div class="table-responsive">
        <table v-if="data" class="table align-middle text-start">
            <TableHeader />  
            <tbody v-if="data.length">                                    
                <tr v-for="submission in onSortBy">
                    <td>
                        <template v-if="props.userRole == 'ROLE_MANAGER'">
                            <RouterLink :to="{ name: 'manager-submission', params: { submissionId: submission.id} }" class="me-2">
                                <img :src="viewLogo" />                            
                            </RouterLink>
                        </template>
                        <template v-else>
                            <RouterLink :to="{ name: 'submission-info', params: { id: farmerId, submissionId: submission.id } }">
                                <img :src="viewLogo"/>
                            </RouterLink>
                        </template>                        
                    </td>
                    <td>{{ submission.id }}</td>
                    <td>{{ submission.creationDate }}</td>
                    <td v-if="submission.state == 'ACCEPTED'">Εγκεκριμμένη</td>
                    <td v-if="submission.state == 'REJECTED'">Απορριμένη</td>
                    <td v-if="submission.state == 'CREATED'">Υπο-επεξεργασία</td>
                    <td>
                        <div class="table-btns-wrap">
                            <template v-if="props.userRole == 'ROLE_MANAGER'">
                                <button v-if="submission.state == 'CREATED'" class="table-edit-btn">
                                    <RouterLink :to="{ name: 'manager-submission-update', params: { submissionId: submission.id} }" class="table-edit-btn-link">
                                        <span class="table-edit-btn-text">Επεξεργασία</span>
                                    </RouterLink>                                  
                                </button>   
                                <button v-else class="table-btn-offline edit">
                                    Μη διαθέσιμη
                                </button>                           
                            </template>
                            <template v-else>
                                <button v-if="submission.state == 'CREATED'" class="table-edit-btn">
                                    <RouterLink :to="{ name: 'submission-update', params: { id: farmerId, submissionId: submission.id } }" class="table-edit-btn-link ">
                                        <span class="table-edit-btn-text">Επεξεργασία</span> 
                                    </RouterLink>                                 
                                </button>          
                                <button v-else class="table-btn-offline edit">
                                    Μη διαθέσιμη
                                </button>                                                                      
                            </template>   
                            <button v-if="submission.state === 'CREATED' && (props.userRole === 'ROLE_CITIZEN' || currentRole.includes('ROLE_ADMIN') )" type="button" class="btn-delete" @click="openModal(submission.id)">Διαγραφή</button>    
                            <button v-else class="table-btn-offline delete">
                                Μη διαθέσιμη
                            </button> 
                        </div>
                    </td>
                    <td class="mr-0" >
                        <button v-if="submission.state == 'ACCEPTED'" type="button" class="btn" @click="onDownload( submission.id )">
                            <img :src="logo"/>
                        </button>  
                    </td>
                </tr>                        
            </tbody>                            
            <tbody v-else>
                <tr>
                    <td colspan="7" class="text-center py-4">
                        Δεν βρέθηκαν κτηνοτροφικές αιτήσεις.
                    </td>
                </tr>
            </tbody>                       
        </table>
    </div>
</template>