<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{

    public function getAll()
    {
        return User::all();
    }
    public function getFirst()
    {
        return User::first();
    }
    public function getById($id)
    {
        return User::findOrFail($id);
    }

    public function store($data)
    {
       return User::create($data);
    }
    public function update($data)
    {
       return User::find($data['id'])->update($data);
    }
    public function delete($id)
    {
        $user = User::find($id);
        return $user->delete();
    }

}
