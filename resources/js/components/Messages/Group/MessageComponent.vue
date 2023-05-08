<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Chat:</h4>
                    <div class="row">
                        <div class="col-8">
                            Groups
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>
                    <div class="col-12">
                        <div class="row">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        Chat
                                    </h5>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <div class="row">
                                                                        <div class="col-6">
                                                                            <h5 class="card-title">
                                                                                Latest Messages
                                                                            </h5>
                                                                        </div>
                                                                        <div class="col-3">
                                                                            <p class="badge badge-soft-primary text-danger col-2">@{{ typing }}</p>
                                                                        </div>
                                                                        <div class="col-3">
                                                                            <p class="font-monospace badge badge-soft-dark">Users Joined:# {{ numberOfUsers }}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="card-text">
                                                                        <div class="col-12">
                                                                            <ul class="list-group">
                                                                                <li v-for="(message,index) in chat.messages" :key="message.index" class="list-group-item list-group-item-info">
                                                                                    <div class="row">
                                                                                        <div class="col-7">
                                                                                            <p class="font-monospace">
                                                                                                Message:
                                                                                                <span class="text-danger">{{ message }}</span>
                                                                                            </p>
                                                                                        </div>
                                                                                        <div class="col-5">
                                                                                            <p class="font-monospace">
                                                                                                Sent By:
                                                                                                <span class="text-danger">{{ chat.users[index] }}</span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer col-12">
                                    <div class="row col-12 pt-2">
                                        <div class="col-10">
                                            <input @keyup.enter="storeMethod(message)" v-model="message" class="form-control" type="text" placeholder="Please Enter Type:" maxlength="50" required>
                                        </div>
                                        <div class="col-2">
                                            <button  @click="storeMethod(message)" class="btn btn-primary">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "GroupMessageComponent",

    created() {
        this.fetchUsers();

    },
    components:{
    },
    data(){
        return {
            base_url:base_url,
            auth_user:auth_user,
            users:{},
            addFormErrors:[],
            message:'',
            username:'',
            chat: {
                messages:[],
                users:[],
            },
            messages: [],
            channelName:'my-channel',
            typing:'',
            numberOfUsers:0,
        }
    },
    mounted() {
        // this.token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.sendMessage(e.username, e.message);
            })
            .listenForWhisper('typing', (e) =>{
                if(e.message != ''){
                    this.typing = e.username + ' typing...'
                }else{
                    this.typing = '';
                }
        });
        Echo.join('chat')
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
                this.numberOfUsers += 1 ;
            })
            .leaving((user) => {
                this.numberOfUsers -= 1 ;
            })
            .error((error) => {
                console.error(error);
            });
    },
    methods:{
        fetchUsers(){
            axios.get(base_url + 'api/users')
                .then(response => {
                    this.users = response.data.users;
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },
        sendMessage(username ,message){
            this.chat.users.push(username);
            this.chat.messages.push(message);
        },
        storeMethod(message)
        {
            if(message === ''){
                return;
            }

            this.sendMessage('You', message);
            let formData = new FormData();
            formData.append('message' ,message);
            axios.post(base_url + 'api/messages/' , formData)
                .then(response => {
                    this.typing = '';
                    this.message = '';
                    // response.data.product ? this.products.push(response.data.product) : null;
                    // this.addFormErrors = response.data.errors;
                })
                .catch(error => {
                    // this.addFormErrors = error.response.data.errors;
                })
        },
    },
    computed:{

    },
    watch:{
        message()
        {
            Echo.private('chat')
                .whisper('typing',{
                    username: this.auth_user.name,
                    message: this.message,
                });
        },
    }
}
</script>

<style scoped>

</style>
