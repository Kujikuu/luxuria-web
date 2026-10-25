<?php

return [
    'approver_ids' => array_values(array_map('intval', array_filter(
        explode(',', (string) env('LUXURIA_LEAD_APPROVER_IDS', '')),
        fn (string $id): bool => ctype_digit(trim($id)) && (int) $id > 0,
    ))),
];
