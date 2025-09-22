<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// DB connection
$host = "localhost";
$user = "root"; // change if needed
$pass = "";     // change if needed
$db   = "shopdb";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "DB connection failed"]);
    exit;
}

// Get POST body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user']) || !isset($data['order'])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

// Insert user
$user = $data['user'];
$stmt = $conn->prepare("INSERT INTO users (name, mobile, company, address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $user['name'], $user['mobile'], $user['company'], $user['address']);
$stmt->execute();
$user_id = $stmt->insert_id;
$stmt->close();

// Insert order
$stmt = $conn->prepare("INSERT INTO orders (user_id) VALUES (?)");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$order_id = $stmt->insert_id;
$stmt->close();

// Insert order items
$stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)");
foreach ($data['order'] as $item) {
    $stmt->bind_param(
        "issdi",
        $order_id,
        $item['id'],
        $item['name'],
        $item['price'],
        $item['qty']
    );
    $stmt->execute();
}
$stmt->close();

echo json_encode(["success" => true, "order_id" => $order_id]);
$conn->close();
?>
