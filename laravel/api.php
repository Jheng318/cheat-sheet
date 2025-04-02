<?php
Route::middleware([isTokenValid::class])->group(function(){
    // User routes
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/enrolment', [UserController::class, 'enrolment']);

    // listing routes
    Route::get('/categories', [ListingController::class, 'listingCategories']);
    Route::get('/programmes', [ListingController::class, 'listingProgrammes']);
    Route::get('/criteria', [ListingController::class, 'listingCriteria']);

    // Diaries routes
    Route::post('/diaries', [DiariesController::class, 'createDiary']);
    Route::get('/diaries_by_enrolment', [DiariesController::class, 'studentDiaries']);
    Route::put('/diary/approve/{id}', [DiariesController::class , 'approveDiary']);
    Route::put('/diary/reject/{id}', [DiariesController::class , 'rejectDiary']);
    Route::get('/diaries_progress_by_enrolment', [DiariesController::class, 'checkProgress']);
});