<?php
/**
 * EDP Advisory - Procesador de Consultas de Contacto
 * Compatible con cualquier hosting estándar (cPanel, Apache, Nginx, PHP 7.4+)
 */

header('Content-Type: application/json; charset=utf-8');

$destinatario = 'info@edpadvisory.com';
$asunto = 'Nueva Consulta de Contacto Web - EDP Advisory';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    $data = $_POST;
}

$nombre    = htmlspecialchars(trim($data['nombre'] ?? ''));
$cargo     = htmlspecialchars(trim($data['cargo'] ?? ''));
$empresa   = htmlspecialchars(trim($data['empresa'] ?? ''));
$email     = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefono  = htmlspecialchars(trim($data['telefono'] ?? ''));
$pais      = htmlspecialchars(trim($data['pais'] ?? ''));
$mensaje   = htmlspecialchars(trim($data['mensaje'] ?? ''));

if (empty($nombre) || empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nombre y correo son requeridos']);
    exit;
}

$cuerpoHTML = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #1d2f54; padding: 20px; }
    .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background-color: #1d2f54; color: #ffffff; padding: 24px; border-bottom: 3px solid #cb9904; }
    .header h2 { margin: 0; font-size: 20px; }
    .content { padding: 24px; }
    .item { margin-bottom: 14px; font-size: 14px; line-height: 1.5; }
    .label { font-weight: bold; color: #8c8c8c; display: block; font-size: 12px; text-transform: uppercase; margin-bottom: 2px; }
    .value { font-size: 15px; color: #0b132b; }
    .footer { background-color: #f8fafc; padding: 16px; font-size: 12px; color: #8c8c8c; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>Nueva Consulta Recibida</h2>
    </div>
    <div class='content'>
      <div class='item'>
        <span class='label'>Remitente:</span>
        <span class='value'><strong>$nombre</strong></span>
      </div>
      <div class='item'>
        <span class='label'>Cargo:</span>
        <span class='value'>$cargo</span>
      </div>
      <div class='item'>
        <span class='label'>Empresa:</span>
        <span class='value'>$empresa</span>
      </div>
      <div class='item'>
        <span class='label'>Correo Electrónico:</span>
        <span class='value'><a href='mailto:$email'>$email</a></span>
      </div>
      <div class='item'>
        <span class='label'>Teléfono:</span>
        <span class='value'>$telefono</span>
      </div>
      <div class='item'>
        <span class='label'>País:</span>
        <span class='value'>$pais</span>
      </div>
      <div class='item'>
        <span class='label'>Mensaje o Consulta:</span>
        <span class='value'>" . nl2br($mensaje) . "</span>
      </div>
    </div>
    <div class='footer'>
      Enviado desde el formulario de contacto de <strong>EDP Advisory</strong>
    </div>
  </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: EDP Advisory Web <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'edpadvisory.com') . ">\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";

$enviado = @mail($destinatario, $asunto, $cuerpoHTML, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Consulta enviada con éxito.',
    'mail_sent' => $enviado
]);
