<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMappedCells;
use Maatwebsite\Excel\Concerns\WithMapping;

class ImportProduct implements ToModel, WithHeadingRow
{
//    public function model(array $row)
//    {
//        return new Product($row);
//    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {
        return new Product([
            'name' => $row['products'],
            'type' => $row['type'],
            'qty' => intval($row['qty']),
//            'name' => isset($row['products']) ? $row['products'] : '',
//            'type' => isset($row['type']) ? $row['type'] : '',
//            'qty' => isset($row['qty']) ? $row['qty'] : 0,
        ]);
    }
}
