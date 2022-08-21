<?php
namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use DB;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $users  = User::with('roles')->get();
        $roles   = Role::all();
        return view('users.index',compact('users','roles'));
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
            'name'    => 'required',
            'email'    => 'required',
            'password'    => 'required',
        ]);

        try {
            DB::beginTransaction();
            $data = array(
                'name'       =>  $request->input('name'),
                'email'      =>  $request->input('email'),
                'password'   =>  bcrypt($request->input('password'))
            );
            $user    = User::create($data);
            $roleIds = $request->input('roleIds') ?? [];
            $user->roles()->attach($roleIds);
            DB::commit();
            return response()->json(['success'=>'user added successfully'],200);
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
        $user = User::with('roles')->find($id);
        if (!$user) {
            return response()->json(['error'=>'user not found'],404);
        }
        return response()->json(compact('user'));
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
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error'=>'user not found'],404);
        }
        $request->validate([
            'name'     => "required",
            'email'    => "required",
            'roleIds'  => 'required'
        ]);

        // dd($request->all());
        //store organization;
        try {

            DB::beginTransaction();
            $data = array(
                'name'       =>  $request->input('name'),
                'email'      =>  $request->input('email'),
            );
            if($request->has('password') && !empty($request->input('password'))){
                $data['password'] =  $request->input('password');
            }
            $user->update($data);
            $roleIds = $request->input('roleIds');
            $user->roles()->detach();
            $user->roles()->attach($roleIds);
            DB::commit();
            return response()->json(['success'=>'user updated successfully'],200);
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
        $user = User::find($id);
        if (!$user) {
            $this->error($e->getMessage());
            return back();
        }
        try {
            $user->roles()->detach();
            $user->delete();
            return response()->json(['message'=> "User has been deleted Successfully"]);
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()],500);
        }
    }
}
