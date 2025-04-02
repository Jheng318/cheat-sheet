<?php

namespace App\Traits;

use App\Models\Token;
use Illuminate\Support\Str;
trait TokenTrait
{
    //
    public function getToken($request){
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        return $token;
    }
    public function generateToken($user){
        $token = Str::random(64);

        Token::create([
            'token' => $token,
            'user_id' => $user->id
        ]);
    }
}