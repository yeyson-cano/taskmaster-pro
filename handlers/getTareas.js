// handlers/getTareas.js

const AWS = require('aws-sdk');

// Crear instancia de DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

// Nombre de la tabla
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async () => {
  try {
    // Parámetros para el escaneo de la tabla
    const params = {
      TableName: tableName,
    };

    // Obtener todas las tareas de DynamoDB
    const result = await dynamoDb.scan(params).promise();

    // Devolver la lista de tareas
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudieron obtener las tareas' }),
    };
  }
};
