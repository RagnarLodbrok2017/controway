<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ImportProductWithMapping implements ToModel, WithStartRow
{
    protected $mapping;

    public function setMapping(array $mapping)
    {
        $this->mapping = $mapping;

        return $this;
    }
    public function startRow(): int
    {
        return $this->mapping ? 2 : 1;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
//        dd($row[0]);
        if ($this->mapping)
        {
            return new Product([
                'name' => isset($row[$this->mapping['name']]) ? $row[$this->mapping['name']] : $row[0],
                'type' => isset($row[$this->mapping['type']]) ? $row[$this->mapping['type']] : $row[1],
                'qty' => isset($row[$this->mapping['qty']]) ? intval($row[$this->mapping['qty']]) : intval($row[2]),
            ]);
        }
        else{
            return new Product([
                'name' => $row[0],
                'type' => $row[1],
                'qty' => intval($row[2]),
            ]);
        }
    }
}
