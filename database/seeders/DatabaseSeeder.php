<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Outlet;
use App\Models\OutletActivity;
use App\Models\OutletActivityImage;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory()->create([
        //     'name' => 'nooralam',
        //     'email' => 'nooralam@example.com',
        // ]);
        // \App\Models\User::factory(20)->create();
        // $roles = [
        //    ['title' => "Super Admin" ],
        //    ['title' => "Admin" ],
        //    ['title' => "Field User" ],
        // ];
        // Role::insert($roles);

        // $permissions = [
        //    ['title' => "user_permission"],
        //    ['title' => "role_permisson" ],
        //    ['title' => "outlets_permission" ],
        // ];
        // Permission::insert($permissions);



        // $outlets = [
        //     [
        //        'name'      => "Muhammad pur",
        //       'latitude'   => '26.287279',
        //       'longitude'   =>'83.515869'
        //      ],
        //     [
        //        'name'        => 'Dhanmondi 32',
        //        'latitude'   => '25.147690',
        //        'longitude'   =>'75.864952'
        //     ],
        //     [
        //         'name'        => 'kolabagan',
        //         'latitude'   => '22.502300',
        //         'longitude'   =>'86.457150'
        //     ],
        // ];



        $outlet_activities = [
            [
               'outlet_id'      => random_int(1,4),
              'visit_date'   => now()->subday(3),
             ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(1),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(2),
            ],
            [
               'outlet_id'      => random_int(1,4),
              'visit_date'   => now()->subday(4),
             ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(12),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(5),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(1),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(3),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(3),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(4),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now()->subday(1),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now(),
            ],
            [
                'outlet_id'      => random_int(1,4),
                'visit_date'   => now(),
            ],
        ];
        OutletActivity::insert($outlet_activities);

        $outlet_images = ['camera (2).png','camera (3).png','camera (4).png','laptop (1).png','laptop (2).png','laptop (3).png','laptop (4).png','laptop (5).png'];
        $outlet_activity_images = [
            [
               'outle_activity_id'      => random_int(1,13),
              'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
             ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
               'outle_activity_id'      => random_int(1,13),
              'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
             ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
            [
                'outle_activity_id'      => random_int(1,13),
                'outlet_image'   => $outlet_images[random_int(0,count($outlet_images)-1)],
            ],
        ];
        OutletActivityImage::insert($outlet_activity_images);


    }
}
