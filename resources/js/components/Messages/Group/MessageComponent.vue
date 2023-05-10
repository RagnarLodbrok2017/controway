<template>
    <div class="row">
        <div class="col-12">
            <div class="offset-4 col-4 offset-sm-1 col-sm-10">
                <li class="list-group-item active">
                    <div class="row">
                        <div class="col-9">
                            <p>Chat Room</p>
                        </div>
                        <div class="col-3">
                            <p>#Users:<span class="badge  badge-pill badge-danger"> {{ numberOfUsers }}</span></p>
                        </div>
                    </div>
                </li>
                <div class="badge badge-pill badge-soft-danger">{{ typing }}</div>
                <ul class="list-group">
                    <message
                        v-for="(message,index) in chat.messages"
                        :key=message.index
                        :message = message
                        :color= chat.colors[index]
                        :user = chat.users[index]
                        :time = chat.times[index]
                    >
<!--                        {{ message }}-->
                    </message>
                </ul>
                <input type="text" class="form-control" placeholder="Type your message here..." v-model='message' @keyup.enter='storeMethod(message)'>
                <br>
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
            message:'',
            username:'',
            chat: {
                messages:[],
                users:[],
                colors:[],
                times:[],
            },
            messages: [],
            channelName:'chat',
            typing:'',
            numberOfUsers:0,
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                //incoming message
                this.sendMessage(e.username, e.message, 'danger', this.getTime());
            })
            .listenForWhisper('typing', (e) =>{
                if(e.message !== '' && e.message.length !== 0){
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
        sendMessage(username ,message, color, time){
            this.chat.users.push(username);
            this.chat.messages.push(message);
            this.chat.colors.push(color);
            this.chat.times.push(time);
        },
        storeMethod(message)
        {
            if(message === '' && message.length === 0 ){
                return;
            }

            this.sendMessage('You', message, 'success', this.getTime());
            let formData = new FormData();
            formData.append('message' ,message);
            axios.post(base_url + 'api/messages/' , formData)
                .then(response => {
                    this.typing = '';
                    this.message = '';
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },
        getTime(){
            let time = new Date();
            return time.getDate()+':'+time.getHours()+':'+time.getMinutes();
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
