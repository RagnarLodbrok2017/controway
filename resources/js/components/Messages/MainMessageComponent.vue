<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Chat Main Page:</h4>
                    <div class="row">
                        <div class="col-4">
                            <router-link :to="{name:'group-chat'}" class="btn btn-primary col-12">
                                Group chat
                            </router-link>
                        </div>
                        <div class="col-4">
                            <router-link :to="{name:'private-chat'}" class="btn btn-primary col-12">
                                Private chat
                            </router-link>
                        </div>
                        <div class="col-4">
                            <router-link :to="{name:'private-chat'}" class="btn btn-primary col-12">
                                Create Group
                            </router-link>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "MainMessageComponent",
    data(){
        return{

        }
    }
}
</script>

<style scoped>

</style>
