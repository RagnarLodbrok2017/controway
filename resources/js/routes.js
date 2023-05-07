let DashboardComponent = () => import('./components/DashboardComponent.vue');
let ProductComponent = () => import('./components/ProductComponent.vue');
let ProductMappingComponent = () => import('./components/ProductMappingComponent.vue');
let UsersComponent = () => import('./components/UserComponent.vue');

let MainMessageComponent = () => import('./components/Messages/MainMessageComponent.vue');
let GroupMessageComponent = () => import('./components/Messages/Group/MessageComponent.vue');
let PrivateMessageComponent = () => import('./components/Messages/Private/MessageComponent.vue');


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
    {
        path:'/dashboard/messages',
        name:'messages',
        component: MainMessageComponent
    },
    {
        path:'/dashboard/messages/groups',
        name:'group-chat',
        component: GroupMessageComponent
    },
    {
        path:'/dashboard/messages/private',
        name:'private-chat',
        component: PrivateMessageComponent
    },

];
