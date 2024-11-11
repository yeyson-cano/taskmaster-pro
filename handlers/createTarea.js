// handlers/createTarea.js

const AWS = require('aws-sdk');
const uuid = require('uuid');

// Crear instancia de DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

// Nombre de la tabla obtenido de las variables de entorno
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  try {
    // Parsear el cuerpo de la solicitud
    const data = JSON.parse(event.body);

    // Validar los campos requeridos
    if (typeof data.titulo !== 'string' || typeof data.descripcion !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El título y la descripción son obligatorios' }),
      };
    }

    // Generar un ID único para la tarea
    const tareaId = uuid.v4();

    // Crear el objeto de la tarea
    const tarea = {
      tareaId,
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaCreacion: new Date().toISOString(),
      fechaLimite: data.fechaLimite || null,
      prioridad: data.prioridad || 'media', // 'alta', 'media', 'baja'
      estado: 'pendiente', // 'pendiente', 'en progreso', 'completada'
      tecnicoId: data.tecnicoId || null,
      coordinadorId: data.coordinadorId || null,
    };

    // Parámetros para guardar en DynamoDB
    const params = {
      TableName: tableName,
      Item: tarea,
    };

    // Guardar la tarea en DynamoDB
    await dynamoDb.put(params).promise();

    // Devolver la respuesta exitosa
    return {
      statusCode: 201,
      body: JSON.stringify(tarea),
    };
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo crear la tarea' }),
    };
  }
};
