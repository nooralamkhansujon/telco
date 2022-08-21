<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    public function Login(Request $request)
    {

        $request->validate([
            'email'=>"required|email",
            'password'=>"required"
        ]);

        $credentials = ['email'=>$request->input('email'),'password'=>$request->input('password')];
        // dd($credentials);
        $user = User::with('roles')->where('email',$credentials['email'])->first();

        if($user->roles->count()  > 0 && $user->roles->first()->title == 'Field User'){
            $this->error("You not authorized to access this?");
            return redirect()->back();
        }

        if(auth()->attempt($credentials)){
            $this->success("You Are LogIn Successfully");
            return redirect()->route('user.index');
        }
        $this->error("Email Or Password is not Matched");
        return redirect()->back();
    }

    public function showLoginForm()
    {
       return view('auth.login');
    }
    public function logout()
    {
       auth()->logout();
       return redirect()->route('showLoginForm');
    }
}
