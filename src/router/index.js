import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Public/HomeView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Public/LoginView.vue')
        }, 
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/Public/SignupView.vue')
        },
        {
            path: '/signup/success',
            name: 'success-signup',
            component: () => import('../views/Public/SignUpSuccessView.vue')
        },
        {
            path: '/faq',
            name: 'faq',
            component: () => import('../views/Public/FAQView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/Public/ContactView.vue')
        },
        {
            path: '/terms',
            name: 'terms',
            component: () => import('../views/Public/TermsOfUseView.vue')
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('../views/Public/PrivacyView.vue')
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: () => import('../views/Public/PasswordView.vue')
        },
        {
            path: '/services',
            name: 'submission_menu',
            component: () => import('../views/Public/ChooseSubmissionView.vue'),      
            children: [
                {
                    path: 'farmer-application',
                    name: 'farmer-application',
                    component: () => import('../views/Public/FarmerSubmissionDetails.vue')
                },
                {
                    path: 'breeder-application',
                    name: 'breeder-application',
                    component: () => import('../views/Public/BreederSubmissionDetails.vue')
                }
            ]   
        },
        {
            path: '/verification/:email/:phoneNumber',
            name: 'verification',
            component: () => import('../views/Public/VerificationView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/Public/PageNotFoundView.vue')
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: () => import('../views/Public/UnauthorizedView.vue')
        },
        ///////////////// CITIZEN ////////////////////
                
        {
            path: '/services/farmer-application/submit',
            name: 'farmer-submission',
            component: () => import('../views/Citizen/FormFarmerView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']  
            }
        },
        {
            path: '/services/breeder-application/submit',
            name: 'breeder-submission',
            component: () => import('../views/Citizen/FormBreederView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']  
            }
        },
        {
            path: '/profile/:id',
            name: 'farmer_profile',
            component: () => import('../views/Citizen/ProfileView.vue'),
            meta: { requiresAuth: true },
            children: [    
                {
                    path: 'details',
                    name: 'profile_details',
                    component: () => import('../views/Citizen/ProfileDetailsView.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_CITIZEN']
                    }
                },
                {
                    path: 'edit',
                    name: 'profile_edit',
                    component: () => import('../views/Citizen/ProfileEditView.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_CITIZEN']
                    },
                },
                {
                    path: 'applications',
                    name: 'my_submissions',
                    component: () => import('../views/Citizen/MyApplicationsView.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_CITIZEN'] 
                    },
                }
            ]
        },
        {
            path: '/profile/:id/edit',
            name: 'edit_profile',
            component: () => import('../views/Citizen/ProfileEditView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']
            }
        },
        {
            path: '/profile/:id/applications/submission/:submissionId',
            name: 'submission-info',
            component: () => import('../views/Citizen/MySubmissionView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN'] 
            }
        },
        {
            path: '/profile/:id/applications/submission/update/:submissionId',
            name: 'submission-update',
            component: () => import('../views/Citizen/MySubmissionEditView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']  
            }
        },
        {
            path: '/profile/:id/applications/breeder/:breederId',
            name: 'breeder-info',
            component: () => import('../views/Citizen/MyBreederView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']  
            }
        },
        {
            path: '/profile/:id/applications/breeder/:breederId/update',
            name: 'breeder-update',
            component: () => import('../views/Citizen/MyBreederEditView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_CITIZEN']  
            }
        },
        /////////////////// MANAGER //////////////////////
        {
            path: '/manager-dashboard',
            name: 'manager-dashboard',
            component: () => import('../views/Manager/ManagerDashboardView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_MANAGER']
            }
        },
        {
            path: '/manager-services',
            name: 'manager-services',
            component: () => import('../views/Manager/ManagerServicesView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_MANAGER']
            },
            children: [
                {
                    path: 'profile',
                    name: 'manager-profile',
                    component: () => import('../views/Manager/ProfileView.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_MANAGER'],
                        requiresQueryId: true
                    }
                },
                {
                    path: 'applications',
                    name: 'manager-applications',
                    component: () => import('../views/Manager/ApplicationsView.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_MANAGER'] 
                    }
                }
            ]
        },
        {
            path: '/manager-services/applications/submission/:submissionId',
            name: 'manager-submission',
            component: () => import('../views/Manager/SubmissionInfoView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] 
            }
        },
        {
            path: '/manager-services/applications/submission/:submissionId/update',
            name: 'manager-submission-update',
            component: () => import('../views/Manager/UpdateSubmissionView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN', 'ROLE_MANAGER']
            }
        },
        {
            path: '/manager-services/applications/breeder/:breederId',
            name: 'manager-breeder',
            component: () => import('../views/Manager/BreederInfoView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN', 'ROLE_MANAGER']
            }
        },
        {
            path: '/manager-services/applications/breeder/:breederId/update',
            name: 'manager-breeder-update',
            component: () => import('../views/Manager/UpdateBreederView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN', 'ROLE_MANAGER']
            }
        },
        //////////////////// ADMIN //////////////////////
        {
            path: '/admin-dashboard',
            name: 'admin-board',
            component: () => import('../views/Admin/AdminBoard.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN'] 
            }
        },
        {
            path: '/admin-services',
            name: 'admin_services',
            component: () => import('../views/Admin/ServicesView.vue'),
            meta: { 
                requiresAuth: true,
                roles: ['ROLE_ADMIN'] 
            },
            children: [
                {
                    path: 'create-manager',
                    name: 'create-manager',
                    component: () => import('../views/Admin/CreateManager.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_ADMIN']
                    }
                },
                {
                    path: 'delete-user',
                    name: 'delete-user',
                    component: () => import('../views/Admin/DeleteUser.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_ADMIN'] 
                    }
                },
                {
                    path: 'applications',
                    name: 'all-applications',
                    component: () => import('../views/Admin/AllApplications.vue'),
                    meta: {
                        requiresAuth: true,
                        roles: ['ROLE_ADMIN']
                    }
                },
                {
                    path: 'users',
                    name: 'all-users',
                    component: () => import('../views/Admin/AllUsers.vue'),
                    meta: { 
                        requiresAuth: true,
                        roles: ['ROLE_ADMIN']
                    }
                }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    const { isAuthenticated, userData } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresQueryId = to.matched.some(r => r.meta.requiresQueryId);
    const userRoles = userData?.roles || [];
    const allowedRoles = to.meta.roles;

    ///////// 1. Auth check /////////
    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        return next('/login');
    }
    
    if (requiresAuth && !allowedRoles?.length) {
        return next("/unauthorized");
    }

    // Enforce required query id
    if (requiresQueryId) {
        if (!to.query.id) {
            console.log('missing required query param');
            return next('/unauthorized');
        }

        // Έλεγχος ότι είναι το δικό του id
        if (String(to.query.id) !== String(userData?.id)) {
            console.log('given id doesnt match with logged in users id');
            return next('/unauthorized');
        }
    }

    ///////// 2. Role check /////////
    if (allowedRoles?.length && !allowedRoles.some(r => userRoles.includes(r))) {
        return next("/unauthorized");
    }
    
    ///////// 3. Locked ID routes (only if citizen is accessing citizen routes) /////////
    const isCitizenRoute = to.matched.some(r => r.meta?.roles?.includes("ROLE_CITIZEN"));
    const possibleKeys = ["id", "farmer_id", "farmerId", "user_id", "userId"];
    const key = possibleKeys.find(k => to.params?.[k] != null);

    if (isCitizenRoute && key) {
        const routeId = String(to.params[key]);
        const myId = String(userData?.id ?? "");

        if (!myId || routeId !== myId) {
            return next("/unauthorized");
        }
    }

    return next();

    
    /*else if (to.matched.some((record) => record.meta.requiresAuth )) {
        if 
        (userData.roles == 'ROLE_CITIZEN' 
            && (
                to.name == 'farmer_profile' ||
                to.name == 'profile_details' ||
                to.name == 'profile_edit' ||
                to.name == 'my_submissions' ||
                to.name == 'submission-info' ||
                to.name == 'submission-update' ||
                to.name == 'breeder-info' ||
                to.name == 'breeder-update' ||
                to.name == 'farmer-submission' ||
                to.name == 'breeder-submission'
                )
        ){
            const lockedIdRoutes = new Set([
                "farmer_profile",
                "profile_details",
                "profile_edit",
                "my_submissions",
                "submission-info",
                "submission-update",
                "breeder-info",
                "breeder-update",
                "farmer-submission",
                "breeder-submission",
                ]);

            if (lockedIdRoutes.has(to.name)) {
                const possibleKeys = ["id", "farmer_id", "farmerId", "user_id", "userId"];
                const key = possibleKeys.find((k) => to.params?.[k] != null);

                if (!key) return next("/unauthorized");

                if (key) {
                    const routeId = String(to.params[key]);

                    const myId = String(userData.id); 
                    if (routeId !== myId) {
                        return next("/unauthorized");
                    }
                }
            }
            next();
        } 
        else if 
        (userData.roles == 'ROLE_MANAGER'
            && (
                to.name == 'manager-profile' ||
                to.name == 'manager-catalog' || 
                to.name == 'manager-submission' ||
                to.name == 'manager-submission-update' ||
                to.name == 'manager-breeder' ||
                to.name == 'manager-breeder-update'
            )
        ){
            next();
        }
        else if
        (userData.roles == 'ROLE_ADMIN'
            && (
                to.name == 'admin-board' ||
                to.name == 'delete-user' ||
                to.name == 'create-manager' ||
                to.name == '' ||
                to.name == '' || 
                to.name == 'manager-breeder' || 
                to.name == 'manager-submission' ||
                to.name == 'manager-breeder-update' || 
                to.name == 'manager-submission-update'
            )
        ){
            next();
        }
        else {
            next('/unauthorized');
        } 
    }
    else {
        next();
    }*/
});

export default router
