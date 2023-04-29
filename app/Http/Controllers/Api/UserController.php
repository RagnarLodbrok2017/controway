<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(UserService $userService)
    {
        $this->middleware(['auth:sanctum','adminAndApproved']);
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (auth()->user()) {
            $users = $this->userService->getAll();
            return response()->json(['users' => $users]);
        }
    }


    public function create()
    {

    }

    public function store(RegisterRequest $request)
    {
        $result = $this->userService->store($request->all());
        if ($result) {
            return response()->json([
                'user' => $result
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
    public function updateApprove(Request $request, $id)
    {
        $validated = $request->validate([
            'is_approved' => 'required'
        ]);
        if ($validated && $id) {
            $request->merge(['id' => $id]);
            $user = $this->userService->updateAttribute($request->only('is_approved','id'));
            if ($user) {
                return response()->json([
                    'user' => $user
                ]);
            }
        }
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'is_approved' => 'required'
        ]);
        if ($request->validated() && $id) {
            $request->merge(['id' => $id]);
            $user = $this->userService->updateAttribute($request->only('is_approved','id'));
            if ($user) {
                return response()->json([
                    'user' => $user
                ]);
            }
        }
    }


    public function destroy($id)
    {
        if ($id) {
            $result = $this->userService->delete($id);
            if ($result) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'User Deleted Successfully!',
                ], 200);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => "User didn't delete!",
                ], 502);
            }
        }
    }
}
