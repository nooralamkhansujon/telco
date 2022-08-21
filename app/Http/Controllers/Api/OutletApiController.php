<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Outlet;
use App\Models\OutletActivity;
use App\Models\OutletActivityImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OutletApiController extends Controller
{
    public function index()
    {
        $outlets  = Outlet::all();
        return response()->json(compact('outlets'));
    }

    public static function uploadImage($file,$public_path,$file_name){
        $name = $file_name;
        $file->move($public_path, $name);
        return $name;
    }
    public  function storeOutletActivity(Request $request){

        try{

            foreach($request->input('files') as $file){
                if(!$file->isValid()){
                    throw new \Exception('File is Not Valid');
                }
                DB::beginTransaction();
                $file_extension = $file->getClientOriginalExtension();
                $file_name = self::uploadImage($file,public_path
            ('outlet_activity'),time().uniqid().'-.'. $file_extension);

                $outletData = array(
                    'outlet_id'         => $request->input('outlet_id'),
                    'visit_date'          => now(),
                );
                $outlet_activity = OutletActivity::create($outletData);
                $outlet_activity_data = [
                    'outle_activity_id' => $outlet_activity->id,
                    'outlet_image'      => $file_name
                ];
                OutletActivityImage::create($outlet_activity_data);
            }
           DB::commit();
           return  response()->json(['message'=>"Outlet activity added successfully"]);
        }catch(Exception $e){
           DB::rollback();
           return response()->json(['error'=>$e->getMessage()],500);
        }

      }
    public function updateOutlet(Request $request,$outlet_id){
        $outlet = Outlet::with('outlet_activities')->find($outlet_id);
        if (!$outlet) {
            return response()->json(['error'=>'outlet not found'],404);
        }
        $request->validate([
            'latitude'    => 'required',
            'longitude'    => 'required',
        ]);
        try {
            DB::beginTransaction();
            $data = array(
                'latitude'   =>  $request->input('latitude'),
                'longitude'  =>  $request->input('longitude')
            );
            $outlet->update($data);
            DB::commit();
            return response()->json(['success'=>'outlet added successfully'],200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error'=>$e->getMessage()],500);
        }

    }
}
