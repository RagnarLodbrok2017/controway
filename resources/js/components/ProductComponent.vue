<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Products Table:</h4>
                    <div class="row">
                        <div class="col-8">
                            <input type="text" v-model="searchTerm" placeholder="Search" class="input-group form-control"/>
                        </div>
                        <div class="col-2">
                            <!-- Button trigger modal -->
                            <div class="modal" id="addModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Products :</h5>
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
                                                                        Name:
                                                                    </label>
                                                                    <input v-model="addForm.name" class="form-control" type="text" placeholder="Please Enter Name:" maxlength="100" required>
                                                                </div>
                                                            </div>
                                                            <div class="row pt-2">
                                                                <div class="col-8">
                                                                    <label class="form-label" title="type">
                                                                        Type:
                                                                    </label>
                                                                    <input v-model="addForm.type" class="form-control" type="text" placeholder="Please Enter Type:" maxlength="50" required>
                                                                </div>
                                                                <div class="col-4">
                                                                    <label class="form-label" title="quantity">
                                                                        Quantity:
                                                                    </label>
                                                                    <input v-model="addForm.qty" class="form-control" type="number">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="col-12" v-if="addFormErrors">
                                                <p class="text-danger" v-for="error in addFormErrors">{{ error }}</p>
                                            </div>
                                            <div class="col-12 dropzone-previews">
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button @click="storeMethod(addForm)" type="button" class="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModel">Add product</button>
                        </div>
                        <div class="col-2">
                            <div class="float-end d-none d-md-inline-block">
                                <div class="dropdown card-header-dropdown">
                                    <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="text-muted">Report<i class="mdi mdi-chevron-down ms-1"></i></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" download="products.xlsx" href="/api/products/export_excel">
                                            <button class="btn btn-warning btn-sm" @click="exportExcelProducts">Export</button>
                                        </a>
                                        <a class="dropdown-item" href="">
                                            Import
                                            <input class="form-control btn btn-sm" type="file" name="select_products_file" ref="select_products_file"
                                                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                        </a>
                                        <a class="dropdown-item">
                                        <input type="submit" class="btn btn-info" @click.prevent="importExcelProducts"/>
                                        </a>
                                        <a class="dropdown-item" href="#">Download Report</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(product, index) in ProductsSearchFilter" :key="product.id">
                            <td> {{ index }}</td>
                            <td> {{ product.name }}</td>
                            <td> {{ product.type }}</td>
                            <td>
                                <p class="text-success" v-if="product.qty !== 0">{{ product.qty }}</p>
                                <p class="text-danger" v-else>None</p>
                            </td>
                            <td>
                                <!-- Button trigger modal -->
                                <button @click="editMethod(product)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Edit</button>
                                <button @click="deleteMethod(product.id)" class="btn btn-warning"> Delete </button>

                            </td>
                        </tr>
                        </tbody>
                    </table>

<!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Products :</h5>
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
                                                                Name:
                                                            </label>
                                                            <input v-model="editForm.name" class="form-control" type="text" placeholder="Please Enter Name:" maxlength="100" required>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-2">
                                                        <div class="col-8">
                                                            <label class="form-label" title="type">
                                                                Type:
                                                            </label>
                                                            <input v-model="editForm.type" class="form-control" type="text" placeholder="Please Enter Type:" maxlength="50" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label class="form-label" title="quantity">
                                                                Quantity:
                                                            </label>
                                                            <input v-model="editForm.qty" class="form-control" type="number">
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
                                    <button @click="updateMethod(editForm)" type="button" class="btn btn-primary">Update</button>
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
    name: "ProductComponent",

    created() {
        this.fetch();
    },
    components:{
    },
    mounted() {

    },
    data(){
        return {
            products:[],
            base_url:base_url,
            addForm:{},
            editForm:{},
            form:{},
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
        }
    },
    methods:{
        fetch()
        {
            axios.get(base_url + 'api/products')
                .then(response => {
                    this.products = response.data.products;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no data loaded')
                })
        },
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/products/' , FormData)
                .then(response => {
                    response.data.product ? this.products.push(response.data.product) : null;
                    this.addFormErrors = response.data.errors;
                })
                .catch(error => {
                    this.addFormErrors = error.response.data.errors;
                })
        },
        editMethod(data)
        {
            this.editForm = data;
            this.editFormErrors = null;
        },
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/products/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.product);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetch();
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
                        axios.delete(base_url+'api/products/'+id)
                            .then(response => {
                                this.products = this.products.filter(product => {
                                    return product.id !== id;
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
        importExcelProducts()
        {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const formData = new FormData();
                        formData.append('file', this.$refs.select_products_file.files[0]);
                        axios.post(base_url+'api/products/import_excel', formData)
                            .then(response => {
                                this.fetch();
                                SwalHelper.successWithMessage('Import completed successfully');
                            })
                            .catch(error => {
                                SwalHelper.errorWithMessage(error.response.data.message);
                            })
                    }
                });
        },
        exportExcelProducts()
        {
            axios.get(base_url + 'api/products/export_excel')
                .then(response => {
                    // this.products = response.data.products;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no data loaded')
                })
        },
    },
    computed:{
        ProductsSearchFilter(){
            if (!this.searchTerm){
                return this.products;
            }
            else {
                return this.products.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
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
