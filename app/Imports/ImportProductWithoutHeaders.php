<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportProductWithoutHeaders implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if (empty($row[0])) {
            return null;
        }

        return new Product([
            'name' => $row[0],
            'type' => $row[1],
            'qty' => intval($row[2]),
        ]);
    }
    public function getMaxColumns(): int
    {
        return 3;
    }
}
