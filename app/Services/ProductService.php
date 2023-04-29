<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Support\Facades\DB;

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
