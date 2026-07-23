<script setup>
import { ref, onMounted, computed } from 'vue';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import { BModal } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import cancelLogo from '@/assets/images/cancel.png';
import { BDropdown, BDropdownHeader, BDropdownItemButton, BDropdownDivider } from 'bootstrap-vue-next';


const router = useRouter();


// For SortBy List
const sortByOption = ref('ROLE_CITIZEN');
const onSortOption = (value) => {
    sortByOption.value = value;
}
// helper: pick a “primary” role for sorting (highest privilege wins)
const getPrimaryRole = (user) => {
    const roles = user?.roles ?? [];
    const priority = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CITIZEN"]; // highest -> lowest
    for (const r of priority) {
        if (roles.includes(r)) return r;
    }
    return roles[0] ?? ""; // fallback
};

const onSortBy = computed(() => {
    const arr = (data.value ?? []).slice();

    // sorts by dropdown-selected role first, then by privilege order, then by id
    const privilegeOrder = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CITIZEN"];

    return arr.sort((a, b) => {
        const aRoles = a?.roles ?? [];
        const bRoles = b?.roles ?? [];

        const aHasSelected = aRoles.includes(sortByOption.value);
        const bHasSelected = bRoles.includes(sortByOption.value);

        // 1) Selected role comes first
        if (aHasSelected !== bHasSelected) return aHasSelected ? -1 : 1;

        // 2) Then order by privilege (Admin -> Manager -> Citizen)
        const aPrimary = getPrimaryRole(a);
        const bPrimary = getPrimaryRole(b);
        const aRank = privilegeOrder.indexOf(aPrimary);
        const bRank = privilegeOrder.indexOf(bPrimary);

        if (aRank !== bRank) return aRank - bRank;

        // 3) Stable tie-breaker (id asc)
        return (a.id ?? 0) - (b.id ?? 0);
    });
});

//// For Modal
const userIdForDelete = ref(null);
const openModalState = ref(false);
const openModal = (value) => {
    userIdForDelete.value = value;
    openModalState.value = true;
}
const onModalDelete = async() => {
    const url = ref('/api/auth/' + userIdForDelete.value);
    const auth = ref(true);
    const deleteMethod = ref('DELETE');
    const { error, performRequest } = remoteDataAccess(url, auth, deleteMethod);
    await performRequest();
    if (error.value == true) {
        alert("Αδυναμία διαγραφής αίτησης με αναγνωριστικό: " + userIdForDelete.value);
    }else {
        router.go(router.currentRoute);
    }
}

const auth = ref(true);
const url = ref('/api/auth');
const { error, loading, data, performRequest } = remoteDataAccess(url, auth);

onMounted(() => {
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
            <p>Είσαι σίγουρος πως θέλεις να διαγράψεις το χρήστη με e-mail: <strong>{{ userIdForDelete }}</strong>;</p>
            <p class="my-modal-body-warning"><i>Εάν προχωρήσετε στην διαγραφή, ο χρήστης δεν θα μπορεί να ανακτηθεί.</i></p>
        </div>   
       
        <div class="my-modal-footer">
            <button class="my-modal-btn-cancel" @click="openModalState = false">Ακύρωση</button>

            <button class="my-modal-btn-delete" @click="onModalDelete();">Διαγραφή</button>
        </div>
    </b-modal>

    <div class="admin-users-container">
        <div class="table-header-container">
            <h2 class="table-title">Χρήστες συστήματος</h2>

            <div class="table-sort-container">
                <b-dropdown size="lg" dropend="" :text="'Ταξινόμηση: ' + sortByOption" variant="none" class="m-2" toggle-class="btn-dropdown-order" noCaret="">
                    <b-dropdown-header>Ρόλος</b-dropdown-header>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button @click="onSortOption('ROLE_CITIZEN')">Citizen</b-dropdown-item-button>
                    <b-dropdown-item-button @click="onSortOption('ROLE_MANAGER')">Manager</b-dropdown-item-button>
                    <b-dropdown-item-button @click="onSortOption('ROLE_ADMIN')">Admin</b-dropdown-item-button>
                </b-dropdown>
            </div>
           
            <div v-if="loading" class="row">
                <div class="spinner-border mx-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table v-if="data" class="table align-middle text-start">
                <template v-if="data.length">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Όνομα χρήστη</th>
                            <th>Διεύθυνση email</th>
                            <th>Ρόλοι</th>
                            <th>Ενέργειες</th>
                        </tr>
                    </thead>
                    <tbody>                                    
                        <tr v-for="user in onSortBy" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.roles.join(', ') }}</td>
                            <td>
                                <button type="button" class="btn-delete" @click="openModal(user.email)">Διαγραφή</button>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </table>
        </div>
    </div>
</template>