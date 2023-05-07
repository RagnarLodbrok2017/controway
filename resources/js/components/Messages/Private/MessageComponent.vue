<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Chat:</h4>
                    <div class="row">
                        <div class="col-8">
                            <input type="text"  placeholder="Search" class="input-group form-control"/>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>
                    <div class="col-12">
                        <div class="col-12">
                            <div class="text-danger p-2" v-for="user in users">
                                <button @click="editMethod(user)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">{{user.name}}</button>
                            </div>
                            <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Chat with
                                                <p class="font-monospace">{{ addForm.name }}</p>
                                                <p class="font-monospace badge badge-soft-dark">Users Joined:{{ numberOfUsers }}</p>
                                            </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                                            <h5 class="card-title col-10">
                                                                                Latest Messages
                                                                            </h5>
                                                                            <p class="badge badge-soft-primary text-danger col-2">@{{ typing }}</p>
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <div class="card-text">
                                                                                <ul>
                                                                                    <li v-for="(message,index) in chat.messages" :key="message.index">
                                                                                        <div class="row">
                                                                                            <div class="col-9">
                                                                                                <p class="text-success">{{ message }}</p>
                                                                                            </div>
                                                                                            <div class="col-3">
                                                                                                <p class="text-danger">{{ chat.users[index] }}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row pt-2">
                                                                <div class="col-10">
                                                                    <input @keyup.enter="storeMethod(addForm)" v-model="addForm.message" class="form-control" type="text" placeholder="Please Enter Type:" maxlength="50" required>
                                                                </div>
                                                                <div class="col-2">
                                                                    <button  @click="storeMethod(addForm)" class="btn btn-primary">Send</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="col-12" v-if="addFormErrors">
                                                <p class="text-danger" v-for="error in addFormErrors">{{ error }}</p>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<!--                                            <button @click="storeMethod(editForm)" type="button" class="btn btn-primary">Update</button>-->
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
    name: "MessageComponent",

    created() {
        this.fetchUsers();

    },
    components:{
    },
    data(){
        return {
            base_url:base_url,
            form:{},
            users:{},
            addForm:[],
            addFormErrors:[],
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
                console.log(e);
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
        storeMethod(FormData)
        {
            if(FormData.message === ''){
                return;
            }

            this.sendMessage(FormData.message, 'You');
            axios.post(base_url + 'api/messages/' , FormData)
                .then(response => {
                    this.typing = '';
                    this.addForm.message = '';
                    // response.data.product ? this.products.push(response.data.product) : null;
                    // this.addFormErrors = response.data.errors;
                })
                .catch(error => {
                    // this.addFormErrors = error.response.data.errors;
                })
        },
        editMethod(data)
        {
            this.addForm = data;
            this.addFormErrors = null;
        },
    },
    computed:{

    },
    watch:{
        'addForm.message'()
        {
            Echo.private('chat')
                .whisper('typing',{
                    username: this.addForm.name,
                    message: this.addForm.message,
                });
        },
    }
}
</script>

<style scoped>

</style>
