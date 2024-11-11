// handlers/deleteTarea.js

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

    // Parámetros para eliminar la tarea
    const params = {
      TableName: tableName,
      Key: { tareaId },
    };

    // Eliminar la tarea de DynamoDB
    await dynamoDb.delete(params).promise();

    // Devolver la confirmación de eliminación
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tarea eliminada exitosamente' }),
    };
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo eliminar la tarea' }),
    };
  }
};
