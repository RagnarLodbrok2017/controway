<?php

namespace App\Http\Controllers\Api;

use App\Exports\ExportProduct;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Imports\ImportProduct;
use App\Imports\ImportProductWithMapping;
use App\Imports\ImportProductWithoutHeaders;
use App\Services\ProductService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    private $productService;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(ProductService $productService)
    {
        $this->middleware(['auth:sanctum','adminAndApproved']);
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (auth()->user()) {
            $products = $this->productService->getAll();
            return response()->json(['products' => $products]);
        }
    }
    public function fields()
    {
        $fields = Schema::getColumnListing('products');
        $fields = array_diff($fields, ['id']);
        $fields = array_diff($fields, ['created_at']);
        $fields = array_diff($fields, ['updated_at']);

//        $fields = DB::table('products')->pluck('name', 'type','qty');
        return response()->json(['fields'=> $fields]);
    }
    public function import(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:xlsx,xls'
        ]);
        if ($path = $request->file('file')) {
            $result = $this->productService->import($request->file('file'));
            return response()->json(['message' => 'Import completed successfully']);
        }
    }

//    Function With map and without map
    public function import_excel_mapping(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:xlsx,xls'
        ]);
        $result = $this->productService->import_excel_mapping($request);
        if ($result) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Product Deleted Successfully!',
                ], 200);
            } else {
            return response()->json([
                'status' => 'failed',
                'message' => "Product didn't delete!",
                ], 502);
        }
    }

    public function export()
    {
        return Excel::download(new ExportProduct, 'products.xlsx');
    }


    public function create()
    {

    }

    public function store(ProductRequest $request)
    {
        $result = $this->productService->store($request->all());
        if ($result) {
            return response()->json([
                'product' => $result
            ]);
        }
    }

    public function show($id)
    {

    }

    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     */
    public function update(ProductRequest $request, $id)
    {
        if ($request->validated() && $id) {
            $request->merge(['id' => $id]);
            $product = $this->productService->update($request->all());
            if ($product) {
                return response()->json([
                    'product' => $product
                ]);
            }
        }
    }


    public function destroy($id)
    {
        if ($id) {
            $result = $this->productService->delete($id);
            if ($result) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Product Deleted Successfully!',
                ], 200);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => "Product didn't delete!",
                ], 502);
            }
        }
    }
}
