<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class UserService
{
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll()
    {
        return $this->userRepository->getAll();
    }
    public function getAuthUser($id)
    {
        return $this->userRepository->getAll();
    }
    public function getFirst()
    {
        return $this->userRepository->getFirst();
    }

    public function getById($id)
    {
        return $this->userRepository->getById($id);
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data = $this->userRepository->store($data);
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
            $result = $this->userRepository->update($data);
            DB::commit();
            if ($result){
                $user = $this->getById($data['id']);
                return $user;
            }
            return $result;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function updateAttribute($data)
    {
        DB::beginTransaction();
        try {
            $result = $this->userRepository->update($data);
            DB::commit();
            if ($result){
                $user = $this->getById($data['id']);
                return $user;
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
                $user = $this->getById($id);
                $this->userRepository->delete($id);
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
