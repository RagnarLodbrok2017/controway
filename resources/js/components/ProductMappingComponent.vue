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
                        <div class="col-4">
                            <div class="float-end d-none d-md-inline-block">
                                <div class="dropdown card-header-dropdown">
                                    <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="text-muted">Report<i class="mdi mdi-chevron-down ms-1"></i></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" download="products.xlsx" href="/api/products/export_excel">
                                            <button class="btn btn-warning btn-sm" @click="exportExcelProducts">Export</button>
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
                    <form @submit.prevent="importExcelWithMappingProducts">
                        <div class="row">
                        <div class="form-group">
                            <a class="dropdown-item" href="">
                                Import
                                <input @change="getHeadersFromExcel"  class="form-control btn btn-sm"
                                       type="file" name="select_products_file" ref="select_products_file"
                                       accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                            </a>
                        </div>
                            <div class="col-4">
                        <div class="form-group">
                            <label for="name">HEADER PRODUCT NAME:</label>
                            <select v-if="excelHeaders" class="form-control" v-model="addForm.name">
                                <option value="" selected disabled>Select an Excel header</option>
                                <option v-for="(header, index) in excelHeaders" :value="index">{{header}}</option>
                            </select>
                        </div>
                            </div>
                            <div class="col-4">
                        <div class="form-group">
                            <label for="type">HEADER TYPE:</label>
                            <select  v-if="excelHeaders" class="form-control"  v-model="addForm.type">
                                <option value="" selected disabled>Select an Excel header</option>
                                <option v-for="(header, index) in excelHeaders" :value="index">{{header}}</option>
                            </select>
                        </div>
                            </div>

                            <div class="col-4">
                        <div class="form-group">
                            <label for="qty">HEADER QUANTITY:</label>
                            <select  v-if="excelHeaders" class="form-control"  v-model="addForm.qty">
                                <option value="" selected disabled>Select an Excel header</option>
                                <option v-for="(header, index) in excelHeaders" :value="index">{{header}}</option>
                            </select>
                        </div>
                            </div>
                        </div>
                        <div class="col-12 pt-2">
                            <button type="submit" class="btn btn-primary">Import</button>
                        </div>

                    </form>
                    <div class="table-class pt-3 pt-2 ">
                        <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Quantity</th>
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
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>


import swalHelper from "./../Helpers/SwalHelper";
import * as XLSX from "xlsx/xlsx";


export default {
    name: "ProductMappingComponent",

    created() {
        this.fetch();
    },
    data(){
        return {
            file: null,
            select_products_file: null,
            products:[],
            base_url:base_url,
            addForm: {},
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
            excelHeaders:[],
        }
    },
    methods:{
        getHeadersFromExcel(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = () => {
                const workbook = XLSX.read(reader.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Change Space in Names Of Headers
                let data = XLSX.utils.sheet_to_json(worksheet, {header: 1}).map((row, rowIndex) => {
                    if (rowIndex === 0) {
                        return row.map(header => {
                            return header.toString().replace(/ /g, '_');
                        });
                    } else {
                        return row;
                    }
                });

                this.excelHeaders = data[0];
                this.saveHeaders(this.excelHeaders); // call method to save headers here
            };
        },
        saveHeaders(headers){
            this.excelHeaders = headers;
        },
        importExcelWithMappingProducts(){
            const formData = new FormData();
            formData.append('file', this.$refs.select_products_file.files[0]);
            if (typeof this.addForm['name'] === 'number' && typeof this.addForm['type'] === 'number' && typeof this.addForm['qty'] === 'number')
            {
                formData.append('fileHeaders', JSON.stringify(this.addForm));
            }
            axios.post(base_url+'api/products/import_excel_mapping', formData)
                .then(response => {
                    this.fetch();
                    SwalHelper.success();
                })
                .catch(error => {
                    SwalHelper.error();
                })
        },
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
}
</script>

<style scoped>

</style>
