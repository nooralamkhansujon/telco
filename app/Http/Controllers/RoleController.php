<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles  = Role::all();
        $permissions  = Permission::all();

        return view('roles.index',compact('roles','permissions'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'role'    => 'required',
            'permissions' => 'required'
        ]);

        try {
            DB::beginTransaction();
            $data = array(
                'title'       =>  $request->input('role'),
            );
            $role = Role::create($data);
            $permissionsIds = $request->input('permissions');
            $role->permissions()->attach($permissionsIds);
            DB::commit();
            return response()->json(['success'=>'role added successfully'],200);
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['error'=>'role not found'],404);
        }
        return response()->json(compact('role'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['error'=>'role not found'],404);
        }
        $request->validate([
            'role'     => "required",
            'permissions'    => "required",
        ]);

        // dd($request->all());
        //store organization;
        try {

            DB::beginTransaction();
            $data = array(
                'title'       =>  $request->input('role'),
            );
            $role->update($data);
            $permissionsIds = $request->input('permissions');
            $role->permissions()->detach();
            $role->permissions()->attach($permissionsIds);
            DB::commit();
            return response()->json(['success'=>'role updated successfully'],200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error'=> $e->getMessage()],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            $this->error($e->getMessage());
            return back();
        }
        try {
            $role->delete();
            return response()->json(['message'=> "Role has been deleted Successfully"]);
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()],500);
        }
    }
}
