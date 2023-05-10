<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
            <div class="row">
                <div class="col-7">
                    <p class="text-info">{{ message }}</p>
                </div>
                <div class="col-5">
                    <span id="time">{{ time }}</span>
                    <small :class='badgeClass'>{{ user }}</small>
                </div>
            </div>

        </li>
    </div>
</template>

<script>
export default {
    props:[
        'message',
        'color',
        'user',
        'time'
    ],
    computed:{
        className(){
            return 'list-group-item-'+this.color;
        },
        badgeClass(){
            return 'text-'+this.color;
        }
    },
    mounted() {

    }
}
</script>
<style>
#time{
    font-size: 9px;
    margin-top: 10px;
    color: black;
}
</style>
