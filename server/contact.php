<?php

	/*if ($_SERVER[ 'HTTP_HOST' ] != $_SERVER[ 'SERVER_NAME' ]) {
		exit();
	}*/

	$today = date("Y-m-d H:i:s");
	foreach ([ 'name', 'surname', 'email', 'org', 'position', 'phone' ] as $key) {
		$$key = isset($_POST[ $key ]) ? $_POST[ $key ] : null;
	}

	$f = fopen("data.csv", "w");
	fputs($f, chr(0xEF) . chr(0xBB) . chr(0xBF));
	fputcsv($f, [
		$today,
		$name,
		$surname,
		$email,
		$org,
		$position,
		$phone
	]);

	echo json_encode([ 'status' => 200, 'message' => 'Success' ]);
	fclose($f);

	exit();