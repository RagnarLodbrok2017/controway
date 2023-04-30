<?php

namespace App\Services;

use App\Imports\ImportProduct;
use App\Imports\ImportProductWithMapping;
use App\Imports\ImportProductWithoutHeaders;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ProductService
{
    private $productRepository;
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAll()
    {
        return $this->productRepository->getAll();
    }
    public function import($file)
    {
        if ($file) {
            try {
                DB::beginTransaction();
                Excel::import(new ImportProduct, $file);
                DB::commit();
            }
            catch (Exception $ex)
            {
                DB::rollBack();
                try {
                    DB::beginTransaction();
                    Excel::import(new ImportProductWithoutHeaders, $file);
                    DB::commit();
                }
                catch (Exception $ex)
                {
                    DB::rollBack();
                    return response()->json([
                        'status' => 'failed',
                        'message' => $ex->getMessage(),
                    ], 502);
                }
            }
            return response()->json(['message' => 'Import completed successfully']);

        }
    }
    public function import_excel_mapping($request)
    {
        if ($request) {
            try {
                $file = $request->file('file');
                $fileHeadersJson = $request->input('fileHeaders');
                if ($request->input('fileHeaders'))
                {
                    $fileHeadersObject = json_decode($fileHeadersJson);
                    $import = new ImportProductWithMapping;

                    $import->setMapping([
                        'name' => $fileHeadersObject->name,
                        'type' => $fileHeadersObject->type,
                        'qty' => $fileHeadersObject->qty
                    ]);
                    DB::beginTransaction();
                    Excel::import($import, $file);
                }
                else{
                    $import = new ImportProductWithMapping;
                    DB::beginTransaction();
                    Excel::import($import, $file);
                }
                DB::commit();
                return true;
            }
            catch (Exception $ex)
            {
                DB::rollBack();
                return false;
            }
            return response()->json(['message' => 'Import completed successfully']);

        }
    }
    public function getFirst()
    {
        return $this->productRepository->getFirst();
    }

    public function getById($id)
    {
        return Product::findOrFail($id);
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data = $this->productRepository->store($data);
            DB::commit();
            return $data;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function update($data)
    {
        DB::beginTransaction();
        try {
            $result = $this->productRepository->update($data);
            DB::commit();
            if ($result){
                $product = $this->getById($data['id']);
                return $product;
            }
            return $result;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function delete($id)
    {
        if ($id){
            DB::beginTransaction();
            try {
                $product = $this->getById($id);
                $this->productRepository->delete($id);
                DB::commit();
                return true;
            }
            catch (Exception $ex){
                DB::rollBack();
                var_dump($ex->getMessage());
                return false;
            }
        }
    }

}
