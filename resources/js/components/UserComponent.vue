<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Users Table:</h4>
                    <div class="row">
                        <div class="col-12">
                            <input type="text" v-model="searchTerm" placeholder="Search" class="input-group form-control"/>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Approved</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(user, index) in UsersSearchFilter" :key="user.id">
                            <td> {{ index +1 }}</td>
                            <td> {{ user.name }}</td>
                            <td> {{ user.email }}</td>
                            <td>
                                <p class="text-success" v-if="user.role === 'admin'">{{ user.role }}</p>
                                <p class="text-danger" v-else>{{ user.role }}</p>
                            </td>
                            <td>
                                <p class="btn btn-success" v-if="user.is_approved">Approved</p>
                                <p class="btn btn-danger" v-else>None</p>
                            </td>
                            <td>
                                <!-- Button trigger modal -->
                                <button v-if="user.role !== 'superAdmin'" @click="editMethod(user)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Edit</button>
                                <button v-if="user.role !== 'superAdmin'" @click="deleteMethod(user.id)" class="btn btn-warning"> Delete </button>
                                <p class="text-danger" v-else>Can't Make Action</p>

                            </td>
                        </tr>
                        </tbody>
                    </table>

<!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Users :</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-8">
                                                            <label class="form-label" title="name">
                                                                Approved:
                                                            </label>
                                                            <select class="input-group form-control" required v-model="editForm.is_approved">
                                                                <option :value="true">
                                                                    Approved
                                                                </option>
                                                                <option  :value="false">
                                                                    Not Approved
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12" v-if="editFormErrors">
                                        <p class="text-danger" v-for="error in editFormErrors">{{ error }}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button @click="updateApprovedMethod(editForm)" type="button" class="btn btn-primary">Update</button>
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


import swalHelper from "./../Helpers/SwalHelper";
export default {
    name: "UserComponent",

    created() {
        this.fetch();
    },
    components:{
    },
    mounted() {

    },
    data(){
        return {
            users:[],
            base_url:base_url,
            editForm:{},
            form:{},
            searchTerm:'',
            editFormErrors:{},
        }
    },
    methods:{
        fetch()
        {
            axios.get(base_url + 'api/users')
                .then(response => {
                    this.users = response.data.users;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no data loaded')
                })
        },
        editMethod(data)
        {
            this.editForm = data;
            this.editFormErrors = null;
        },
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/users/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.user);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchDoctors();
                })
        },
        updateApprovedMethod(FormData)
        {
            axios.put(base_url + 'api/users/approved/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.user);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchDoctors();
                })
        },
        deleteMethod(id)
        {
            if (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(base_url+'api/users/'+id)
                            .then(response => {
                                this.users = this.users.filter(user => {
                                    return user.id !== id;
                                });
                                SwalHelper.successWithMessage(response.data.message);
                            })
                            .catch(error => {
                                SwalHelper.errorWithMessage(error.response.data.message);
                            })
                    }
                });
            }
        },
    },
    computed:{
        UsersSearchFilter(){
            if (!this.searchTerm){
                return this.users;
            }
            else {
                return this.users.filter(user => {
                    return user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
                })
            }
        }
    },
    watch:{

    }
}
</script>

<style scoped>

</style>
