<?php
/**
 * EDP Advisory - Procesador de Reserva de Reuniones
 * Compatible con cualquier hosting estándar (cPanel, Apache, Nginx, PHP 7.4+)
 */

header('Content-Type: application/json; charset=utf-8');

// Configuración de destino
$destinatario = 'info@edpadvisory.com'; // Cambiar por el correo donde desees recibir las reservas
$asunto = 'Nueva Solicitud de Reunión Estratégica - EDP Advisory';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Obtener datos (soporta tanto JSON como multipart/form-data)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    $data = $_POST;
}

// Sanitizar campos
$tipo      = htmlspecialchars(trim($data['tipo'] ?? 'Reunión Estratégica'));
$fecha     = htmlspecialchars(trim($data['fecha'] ?? 'No especificada'));
$horario   = htmlspecialchars(trim($data['horario'] ?? 'No especificado'));
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

// Estructurar cuerpo del correo en HTML institucional
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
    .label { font-weight: bold; color: #1d2f54; display: block; font-size: 12px; text-transform: uppercase; color: #8c8c8c; margin-bottom: 2px; }
    .value { font-size: 15px; color: #0b132b; }
    .highlight { background-color: #f8fafc; border-left: 3px solid #cb9904; padding: 12px; margin: 16px 0; }
    .footer { background-color: #f8fafc; padding: 16px; font-size: 12px; color: #8c8c8c; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>Nueva Solicitud de Reunión Estratégica</h2>
    </div>
    <div class='content'>
      <div class='highlight'>
        <div class='item'>
          <span class='label'>Tipo de Reunión:</span>
          <span class='value'><strong>$tipo</strong></span>
        </div>
        <div class='item'>
          <span class='label'>Fecha y Horario Solicitado:</span>
          <span class='value'><strong>$fecha — $horario hs (GMT-3)</strong></span>
        </div>
      </div>

      <div class='item'>
        <span class='label'>Solicitante:</span>
        <span class='value'>$nombre</span>
      </div>
      <div class='item'>
        <span class='label'>Cargo:</span>
        <span class='value'>$cargo</span>
      </div>
      <div class='item'>
        <span class='label'>Empresa / Organización:</span>
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
        <span class='label'>Detalles del Proyecto / Desafío:</span>
        <span class='value'>" . nl2br($mensaje) . "</span>
      </div>
    </div>
    <div class='footer'>
      Enviado desde el sistema de reservas de <strong>EDP Advisory</strong>
    </div>
  </div>
</body>
</html>
";

// Cabeceras de correo
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: EDP Advisory Web <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'edpadvisory.com') . ">\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";

// Envío a través de mail() nativo de PHP
$enviado = @mail($destinatario, $asunto, $cuerpoHTML, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Reserva registrada con éxito.',
    'mail_sent' => $enviado
]);
