<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('inquiries', 'company') && ! Schema::hasColumn('inquiries', 'phone')) {
            Schema::table('inquiries', function (Blueprint $table) {
                $table->renameColumn('company', 'phone');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('inquiries', 'phone') && ! Schema::hasColumn('inquiries', 'company')) {
            Schema::table('inquiries', function (Blueprint $table) {
                $table->renameColumn('phone', 'company');
            });
        }
    }
};
