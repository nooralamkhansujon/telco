<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\Outlet;
use App\Models\OutletActivity;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $outlets  = Outlet::with('outlet_activities')->get();
        return view('outlets.index',compact('outlets'));
    }

    public function getOutlets()
    {
        $outlets  = Outlet::all();
        return response()->json(compact('outlets'));
    }

    public function outlet_activities(Request $request)
    {
        $outlets  = Outlet::all();
        $outlet_activities = collect([]);
        $from = date('Y-m-d');
        $to   = date('Y-m-d');
        if(!$request->has('daterange') || empty($request->input('daterange'))){
            return view('outlets.outletactivities',compact('outlets','outlet_activities','from','to'));
        }
        // dd($request->input('daterange'));
        $dateExplode = explode(' - ',$request->input('daterange'));
        $from = date('Y-m-d',strtotime($dateExplode[0]));
        $to = date('Y-m-d',strtotime($dateExplode[1]));
        // dd($dateExplode[1]);
        $outlet_activities = OutletActivity::with('outlet')
                            ->when($request->has('outlet_id') && !empty($request->input('outlet_id')),function($query)use($request){
                                $query->where('outlet_id',$request->input('outlet_id'));
                            })
                            ->whereBetween('visit_date',[$from,$to])->get();
        return view('outlets.outletactivities',compact('outlets','outlet_activities','from','to'));

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
            'latitude'    => 'required',
            'longitude'    => 'required',
        ]);

        try {
            DB::beginTransaction();
            $data = array(
                'name'       =>  $request->input('name'),
                'latitude'      =>  $request->input('latitude'),
                'longitude'   =>  $request->input('longitude')
            );
            Outlet::create($data);
            DB::commit();
            return response()->json(['success'=>'outlet added successfully'],200);
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
        $outlet = Outlet::with('outlet_activities')->find($id);
        if (!$outlet) {
            return response()->json(['error'=>'outlet not found'],404);
        }
        return response()->json(compact('outlet'));
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
        $outlet = Outlet::find($id);
        if (!$outlet) {
            return response()->json(['error'=>'outlet not found'],404);
        }
        $request->validate([
            'name'        => 'required',
            'latitude'    => 'required',
            'longitude'   => 'required',
        ]);

        //store organization;
        try {

            DB::beginTransaction();
            $data = array(
                'name'       =>  $request->input('name'),
                'latitude'   =>  $request->input('latitude'),
                'longitude'   =>  $request->input('longitude')
            );
            $outlet->update($data);
            DB::commit();
            return response()->json(['success'=>'outlet updated successfully'],200);
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
        $outlet = Outlet::find($id);
        if (!$outlet) {
            $this->error($e->getMessage());
            return back();
        }
        try {
            // $outlet->roles()->detach();
            $outlet->delete();
            return response()->json(['message'=> "Outlet has been deleted Successfully"]);
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()],500);
        }
    }
}
