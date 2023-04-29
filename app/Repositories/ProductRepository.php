<?php

namespace App\Repositories;

use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class ProductRepository
{

    public function getAll()
    {
        return Product::all();
    }
    public function getFirst()
    {
        return Product::first();
    }
    public function getById($id)
    {
        return Product::findOrFail($id);
    }

    public function store($data)
    {
       return Product::create($data);
    }
    public function update($data)
    {
       return Product::find($data['id'])->update($data);
    }
    public function delete($id)
    {
        $product = Product::find($id);
        return $product->delete();
    }

}
