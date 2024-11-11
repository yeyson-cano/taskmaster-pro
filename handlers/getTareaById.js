// handlers/getTareaById.js

const AWS = require('aws-sdk');

// Crear instancia de DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

// Nombre de la tabla
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  try {
    // Obtener el tareaId de los parámetros de ruta
    const { tareaId } = event.pathParameters;

    // Validar que tareaId esté presente
    if (!tareaId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Se requiere el ID de la tarea' }),
      };
    }

    // Parámetros para obtener la tarea
    const params = {
      TableName: tableName,
      Key: { tareaId },
    };

    // Obtener la tarea de DynamoDB
    const result = await dynamoDb.get(params).promise();

    // Verificar si la tarea existe
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Tarea no encontrada' }),
      };
    }

    // Devolver la tarea encontrada
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo obtener la tarea' }),
    };
  }
};
