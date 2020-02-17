<?php

	/*if ($_SERVER[ 'HTTP_HOST' ] != $_SERVER[ 'SERVER_NAME' ]) {
		exit();
	}*/

	$today = date("Y-m-d H:i:s");
	foreach ([ 'name', 'email', 'org', 'position', 'phone' ] as $key) {
		$$key = isset($_POST[ $key ]) ? $_POST[ $key ] : null;
	}

	$f = fopen("data.csv", "aw");
	fputcsv($f, [
		$today,
		$name,
		$email,
		$org,
		$position,
		$phone
	]);
//	fwrite($f, "\nЗаявка от ".$today.". ФИО: ".$name.". Email: ".$email.". Организация: ".$org.". Должность: ".$position.". Телефон: ".$phone);
	echo json_encode([ 'status' => 200, 'message' => 'Success' ]);
	fclose($f);

	exit();