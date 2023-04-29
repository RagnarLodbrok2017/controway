<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

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
                    'message' => 'Doctor Deleted Successfully!',
                ], 200);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => "Doctor didn't delete!",
                ], 502);
            }
        }
    }
}
