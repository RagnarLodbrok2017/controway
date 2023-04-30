let DashboardComponent = () => import('./components/DashboardComponent.vue');
let ProductComponent = () => import('./components/ProductComponent.vue');
let ProductMappingComponent = () => import('./components/ProductMappingComponent.vue');
let UsersComponent = () => import('./components/UserComponent.vue');


export const routes = [
    {
        path:'/dashboard',
        name:'dashboard',
        component: DashboardComponent
    },
    {
        path:'/dashboard/users',
        name:'users',
        component: UsersComponent
    },
    {
        path:'/dashboard/products',
        name:'products',
        component: ProductComponent
    },
    {
        path:'/dashboard/mapping',
        name:'mapping',
        component: ProductMappingComponent
    },

];
