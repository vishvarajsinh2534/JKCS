<?php
// save_order.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// --- Database Connection ---
$host = "localhost";
$user = "root";      // 👈 change if different
$pass = "";          // 👈 your MySQL password
$dbname = "shopdb";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "DB connection failed: " . $conn->connect_error]));
}

// --- Get JSON Payload ---
$input = json_decode(file_get_contents("php://input"), true);
if (!$input) {
    echo json_encode(["success" => false, "error" => "Invalid JSON"]);
    exit;
}

$user = $input["user"];
$order = $input["order"];

// --- Insert User ---
$stmt = $conn->prepare("INSERT INTO users (name, mobile, company, address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $user["name"], $user["mobile"], $user["company"], $user["address"]);
$stmt->execute();
$user_id = $stmt->insert_id;
$stmt->close();

// --- Insert Order ---
$stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, NOW())");
$total = 0;
foreach ($order as $item) {
    $total += $item["price"] * $item["quantity"];
}
$stmt->bind_param("id", $user_id, $total);
$stmt->execute();
$order_id = $stmt->insert_id;
$stmt->close();

// --- Insert Order Items ---
$stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, name, price, quantity, category) VALUES (?, ?, ?, ?, ?, ?)");
foreach ($order as $item) {
    $stmt->bind_param("iisdis",
        $order_id,
        $item["id"],
        $item["name"],
        $item["price"],
        $item["quantity"],
        $item["category"]
    );
    $stmt->execute();
}
$stmt->close();

echo json_encode(["success" => true, "order_id" => $order_id]);

$conn->close();
